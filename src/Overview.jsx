import { h } from 'preact';
import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { db } from '../../../services/firebase.js';
import { collection, getDocs, query, where, doc, getDoc, onSnapshot } from 'firebase/firestore';
import FirestoreUsageDisplay from '../FirestoreUsageDisplay.jsx';
import { getProjectFiles } from '../../../services/supabase.js';

const initialStats = { dueToday: 0, progress: 0, totalProjects: 0, activeTasks: 0 };

function generateAvatar(name) {
    if (!name) return 'U';
    const words = name.split(' ');
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
}

const Overview = () => {
    const [userData, setUserData] = useState(null);
    const [stats, setStats] = useState(initialStats);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [recentFiles, setRecentFiles] = useState([]);
    const [showFilesPopup, setShowFilesPopup] = useState(false);
    const [filesLoading, setFilesLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showExtendedKanban, setShowExtendedKanban] = useState(false);
    
    // Refs to store current data for real-time updates
    const projectsRef = useRef([]);
    const tasksRef = useRef([]);
    const teamMembersRef = useRef([]);

    // Helper: Priority color
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'red-400';
            case 'medium': return 'amber-400';
            case 'low': return 'emerald-400';
            default: return 'gray-400';
        }
    };

    // Helper: Due date text
    const getDueDateText = (dueDate) => {
        if (!dueDate) return 'No due date';
        const due = new Date(dueDate);
        const today = new Date();
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays <= 7) return `${diffDays}d left`;
        return due.toLocaleDateString();
    };

    // Helper: Event type color
    const getEventTypeColor = (type) => {
        switch (type) {
            case 'task': return 'bg-emerald-500';
            case 'meeting': return 'bg-blue-500';
            case 'deadline': return 'bg-red-500';
            case 'milestone': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    // Helper: Time ago
    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Recently';
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    };

    // Calendar navigation
    const goToPreviousMonth = () => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() - 1);
            return newDate;
        });
    };

    const goToNextMonth = () => {
        setCurrentMonth(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + 1);
            return newDate;
        });
    };

    // Navigation functions
    const navigateToProjects = () => {
        // Dispatch custom event to change dashboard section
        window.dispatchEvent(new CustomEvent('changeDashboardSection', { detail: 'projects' }));
    };

    const navigateToCommunications = () => {
        // Dispatch custom event to change dashboard section
        window.dispatchEvent(new CustomEvent('changeDashboardSection', { detail: 'communications' }));
    };

    // Load recent files
    const loadRecentFiles = async () => {
        setFilesLoading(true);
        try {
            console.log('Loading recent files...');
            console.log('Available projects:', projects);
            
            const allFiles = [];
            
            // Method 1: Try to get files from all projects using Supabase service
            for (const project of projects) {
                try {
                    console.log(`Fetching files for project: ${project.name} (${project.id})`);
                    const projectFiles = await getProjectFiles(project.id);
                    console.log(`Found ${projectFiles.length} files for project ${project.name}:`, projectFiles);
                    
                    const filesWithProject = projectFiles.map(file => ({
                        ...file,
                        projectName: project.name,
                        projectId: project.id,
                        name: file.fileName || file.name, // Handle both fileName and name properties
                        size: file.fileSize || file.size, // Handle both fileSize and size properties
                        created_at: file.uploadedAt || file.created_at, // Handle both uploadedAt and created_at
                        uploaded_at: file.uploadedAt || file.uploaded_at
                    }));
                    allFiles.push(...filesWithProject);
                } catch (error) {
                    console.error(`Error loading files for project ${project.id}:`, error);
                }
            }
            
            // Method 2: If no files found, try to get all files from Firestore directly
            if (allFiles.length === 0) {
                console.log('No files found via project method, trying direct Firestore query...');
                try {
                    const filesRef = collection(db, 'projectFiles');
                    const querySnapshot = await getDocs(filesRef);
                    const directFiles = [];
                    
                    querySnapshot.forEach((doc) => {
                        const fileData = doc.data();
                        // Find the project name for this file
                        const project = projects.find(p => p.id === fileData.projectId);
                        directFiles.push({
                            ...fileData,
                            projectName: project ? project.name : 'Unknown Project',
                            name: fileData.fileName || fileData.name,
                            size: fileData.fileSize || fileData.size,
                            created_at: fileData.uploadedAt || fileData.created_at,
                            uploaded_at: fileData.uploadedAt || fileData.uploaded_at
                        });
                    });
                    
                    console.log('Files found via direct Firestore query:', directFiles);
                    allFiles.push(...directFiles);
                } catch (error) {
                    console.error('Error loading files directly from Firestore:', error);
                }
            }
            
            console.log('All files collected:', allFiles);
            
            // Sort by creation date (most recent first) and take top 10
            const sortedFiles = allFiles
                .sort((a, b) => {
                    const dateA = new Date(a.created_at || a.uploaded_at || a.uploadedAt || 0);
                    const dateB = new Date(b.created_at || b.uploaded_at || b.uploadedAt || 0);
                    return dateB - dateA;
                })
                .slice(0, 10);
            
            console.log('Sorted and filtered files:', sortedFiles);
            setRecentFiles(sortedFiles);
        } catch (error) {
            console.error('Error loading recent files:', error);
            setRecentFiles([]);
        } finally {
            setFilesLoading(false);
        }
    };

    const openFilesPopup = () => {
        setShowFilesPopup(true);
        loadRecentFiles();
    };

    const closeFilesPopup = () => {
        setShowFilesPopup(false);
        setSelectedFile(null);
        setShowPreview(false);
    };

    const openFilePreview = (file) => {
        setSelectedFile(file);
        setShowPreview(true);
    };

    const closeFilePreview = () => {
        setShowPreview(false);
        setSelectedFile(null);
    };

    // Helper: Check if file is an image
    const isImageFile = (fileName) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'];
        const extension = fileName.split('.').pop()?.toLowerCase();
        return imageExtensions.includes(extension);
    };

    // Helper: Check if file is a document
    const isDocumentFile = (fileName) => {
        const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
        const extension = fileName.split('.').pop()?.toLowerCase();
        return documentExtensions.includes(extension);
    };

    // Helper: Get file icon based on type
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf': return '📄';
            case 'doc':
            case 'docx': return '📝';
            case 'xls':
            case 'xlsx': return '📊';
            case 'ppt':
            case 'pptx': return '📈';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'svg': return '🖼️';
            case 'mp4':
            case 'avi':
            case 'mov': return '🎥';
            case 'mp3':
            case 'wav': return '🎵';
            case 'zip':
            case 'rar': return '📦';
            default: return '📄';
        }
    };

    // Helper: Format file size
    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    // Export dashboard data
    const updateStatsAndActivity = (projectsArr, tasksArr, teamArr) => {
        if (!projectsArr || !tasksArr || !teamArr) return;

        // Stats
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dueToday = tasksArr.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate.getTime() === today.getTime();
        }).length;
        const totalTasks = tasksArr.length;
        const completedTasks = tasksArr.filter(task => task.status === 'completed').length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        const totalProjects = projectsArr.length;
        const activeTasks = tasksArr.filter(task => task.status === 'in-progress' || task.status === 'pending').length;
        setStats({ dueToday, progress, totalProjects, activeTasks });

        // Team workload
        // Calculate max active tasks for any member
        let maxActiveTasks = 1;
        const memberActiveTasks = teamArr.map(member => {
            // Gather all possible identifiers for this member
            const memberIds = [member.id];
            if (member.email) memberIds.push(member.email);
            if (member.name) memberIds.push(member.name);
            if (member.displayName) memberIds.push(member.displayName);
            // Find all tasks assigned to this member by any identifier
            const assignedTasks = tasksArr.filter(task =>
                memberIds.includes(task.assignedTo) ||
                memberIds.includes(task.assignedToName) ||
                memberIds.includes(task.assignee)
            );
            const active = assignedTasks.filter(task =>
                task.status !== 'done' &&
                task.status !== 'Done' &&
                task.status !== 'DONE' &&
                task.status !== 'completed'
            );
            if (active.length > maxActiveTasks) maxActiveTasks = active.length;
            return { ...member, activeCount: active.length };
        });
        // Now assign percentage for bar
        const updatedTeam = memberActiveTasks.map(member => ({
            ...member,
            workloadBar: maxActiveTasks > 0 ? Math.round((member.activeCount / maxActiveTasks) * 100) : 0
        }));
        setTeamMembers(updatedTeam.sort((a, b) => b.activeCount - a.activeCount));

        // Recent activity
        let activityArr = [];
        // Completed tasks
        const completed = tasksArr.filter(task => ['completed', 'done', 'Done', 'DONE'].includes(task.status))
            .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
            .slice(0, 3);
        for (const task of completed) {
            // Get proper user name
            let userName = 'Team Member';
            if (task.assignedToName) {
                userName = task.assignedToName;
            } else if (task.assignedTo) {
                // Check if it's a display name (not an ID)
                if (task.assignedTo.length < 20 && !task.assignedTo.includes('@')) {
                    userName = task.assignedTo;
                } else {
                    // Try to find in team members
                    const teamMember = teamArr.find(member => member.id === task.assignedTo);
                    if (teamMember) {
                        userName = teamMember.name;
                    }
                }
            }
            
            activityArr.push({
                user: userName,
                action: 'completed task',
                target: task.title,
                time: getTimeAgo(task.updatedAt || task.createdAt),
                avatar: generateAvatar(userName),
                color: 'emerald'
            });
        }
        // Recent projects
        const recentProjects = projectsArr
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
            .slice(0, 2);
        for (const project of recentProjects) {
            // Get proper user name
            let userName = 'Team Member';
            if (project.createdBy) {
                if (project.createdBy.length < 20 && !project.createdBy.includes('@')) {
                    userName = project.createdBy;
                } else {
                    const teamMember = teamArr.find(member => member.id === project.createdBy);
                    if (teamMember) {
                        userName = teamMember.name;
                    }
                }
            } else if (project.project_lead) {
                if (project.project_lead.length < 20 && !project.project_lead.includes('@')) {
                    userName = project.project_lead;
                } else {
                    const teamMember = teamArr.find(member => member.id === project.project_lead);
                    if (teamMember) {
                        userName = teamMember.name;
                    }
                }
            }
            
            activityArr.push({
                user: userName,
                action: 'created project',
                target: project.name,
                time: getTimeAgo(project.createdAt),
                avatar: generateAvatar(userName),
                color: 'purple'
            });
        }
        // Recent created tasks
        if (activityArr.length < 3) {
            const recentCreated = tasksArr
                .filter(task => !['completed', 'done', 'Done', 'DONE'].includes(task.status))
                .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
                .slice(0, 3 - activityArr.length);
            for (const task of recentCreated) {
                // Get proper user name
                let userName = 'Team Member';
                if (task.assignedToName) {
                    userName = task.assignedToName;
                } else if (task.assignedTo) {
                    if (task.assignedTo.length < 20 && !task.assignedTo.includes('@')) {
                        userName = task.assignedTo;
                    } else {
                        const teamMember = teamArr.find(member => member.id === task.assignedTo);
                        if (teamMember) {
                            userName = teamMember.name;
                        }
                    }
                }
                
                activityArr.push({
                    user: userName,
                    action: 'created task',
                    target: task.title,
                    time: getTimeAgo(task.createdAt),
                    avatar: generateAvatar(userName),
                    color: 'blue'
                });
            }
        }
        setRecentActivity(activityArr);
    };

    const exportDashboardData = () => {
        try {
            const exportData = {
                exportDate: new Date().toISOString(),
                user: {
                    name: userData?.displayName || 'Unknown User',
                    email: userData?.email || 'Unknown Email',
                    role: userData?.role || 'member'
                },
                stats: {
                    dueToday: stats.dueToday,
                    progress: stats.progress,
                    totalProjects: stats.totalProjects,
                    activeTasks: stats.activeTasks
                },
                projects: projects.map(project => ({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    status: project.status,
                    createdAt: project.createdAt,
                    project_lead: project.project_lead,
                    createdBy: project.createdBy
                })),
                tasks: tasks.map(task => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    assignedTo: task.assignedTo,
                    assignedToName: task.assignedToName,
                    projectId: task.projectId,
                    projectName: task.projectName,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt
                })),
                teamMembers: teamMembers.map(member => ({
                    id: member.id,
                    name: member.name,
                    role: member.role,
                    activeCount: member.activeCount,
                    workloadBar: member.workloadBar
                })),
                recentActivity: recentActivity.map(activity => ({
                    user: activity.user,
                    action: activity.action,
                    target: activity.target,
                    time: activity.time,
                    color: activity.color
                }))
            };

            // Create and download the JSON file
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `flow-dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Show success message
            window.dispatchEvent(new CustomEvent('showToast', { 
                detail: { message: 'Dashboard data exported successfully!', type: 'success' } 
            }));
        } catch (error) {
            console.error('Error exporting dashboard data:', error);
            window.dispatchEvent(new CustomEvent('showToast', { 
                detail: { message: 'Failed to export dashboard data', type: 'error' } 
            }));
        }
    };

    // Data loading with real-time listeners
    useEffect(() => {
        let projectsUnsubscribe = null;
        let tasksUnsubscribe = null;
        let teamMembersUnsubscribe = null;

        const setupRealTimeListeners = () => {
            setLoading(true);
            
            // Get user data from localStorage
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            setUserData(userData);

            // Real-time listener for projects
            const projectsCollectionRef = collection(db, 'projects');
            projectsUnsubscribe = onSnapshot(projectsCollectionRef, (snapshot) => {
                const projectsArr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                projectsRef.current = projectsArr;
                setProjects(projectsArr);
                updateStatsAndActivity(projectsArr, tasksRef.current, teamMembersRef.current);
            }, (error) => {
                console.error('Error listening to projects:', error);
                setProjects([]);
            });

            // Real-time listener for tasks
            const tasksCollectionRef = collection(db, 'tasks');
            tasksUnsubscribe = onSnapshot(tasksCollectionRef, async (snapshot) => {
                const tasksArr = await Promise.all(snapshot.docs.map(async docSnap => {
                    const data = docSnap.data();
                    let projectName = 'Unknown Project';
                    if (data.projectId) {
                        try {
                            const projectDoc = await getDoc(doc(db, 'projects', data.projectId));
                            if (projectDoc.exists()) projectName = projectDoc.data().name || projectName;
                        } catch {}
                    }
                    return { id: docSnap.id, ...data, projectName };
                }));
                tasksRef.current = tasksArr;
                setTasks(tasksArr);
                updateStatsAndActivity(projectsRef.current, tasksArr, teamMembersRef.current);
            }, (error) => {
                console.error('Error listening to tasks:', error);
                setTasks([]);
            });

            // Real-time listener for team members
            const usersRef = collection(db, 'users');
            teamMembersUnsubscribe = onSnapshot(usersRef, (snapshot) => {
                const teamArr = snapshot.docs.map(doc => {
                    const userData = doc.data();
                    return {
                        id: doc.id,
                        name: userData.displayName || userData.email?.split('@')[0],
                        role: userData.role,
                        avatar: generateAvatar(userData.displayName || userData.email),
                        workload: 0
                    };
                });
                teamMembersRef.current = teamArr;
                setTeamMembers(teamArr);
                updateStatsAndActivity(projectsRef.current, tasksRef.current, teamArr);
            }, (error) => {
                console.error('Error listening to team members:', error);
                setTeamMembers([]);
            });

            setLoading(false);
        };

        setupRealTimeListeners();

        return () => {
            if (projectsUnsubscribe) projectsUnsubscribe();
            if (tasksUnsubscribe) tasksUnsubscribe();
            if (teamMembersUnsubscribe) teamMembersUnsubscribe();
        };
    }, []);

    if (loading) {
        return <div class="p-8 text-center text-gray-400">Loading overview...</div>;
    }

    return (
        <div class="px-4 space-y-6 pb-20 lg:pb-6">

            {/* Header Section */}
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div class="flex items-start lg:items-center gap-4">
                    <div class="flex flex-col">
                        <div class="flex items-center gap-3">
                            <h1 class="text-2xl lg:text-3xl font-semibold text-white">Dashboard Overview</h1>
                            <div class="hidden lg:flex items-center gap-2">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400">Pro</span>
                            </div>
                        </div>
                        <p class="text-gray-400 mt-1 text-sm lg:text-base">Track your projects, tasks, and team performance</p>
                        <div class="lg:hidden flex items-center gap-2 mt-2">
                            <span class="text-sm text-gray-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                            <span class="w-1 h-1 rounded-full bg-gray-600"></span>
                            <span class="text-sm text-gray-400">Week 32</span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div class="flex flex-col sm:flex-row gap-3">
                    {/* Search - Mobile Only */}
                    <div class="lg:hidden relative">
                        <input type="text" 
                               placeholder="Search..." 
                               class="w-full h-9 px-4 rounded-lg bg-white/[0.05] border border-white/[0.05] focus:border-indigo-500 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                        <button class="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg class="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div class="flex items-center gap-2 sm:gap-3">
                        {/* Export Button */}
                        <button 
                            onClick={exportDashboardData}
                            class="h-9 w-9 lg:w-auto lg:px-4 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2 group"
                        >
                            <svg class="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span class="hidden lg:inline text-sm text-gray-400 group-hover:text-white transition-colors">Export</span>
                        </button>

                        {/* Create Project Button */}
                        <button
                            class="h-9 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-colors text-white text-sm font-medium flex items-center gap-2"
                            onClick={navigateToProjects}
                            data-testid="create-project-btn"
                        >
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span class="hidden sm:inline">Create Project</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Welcome Section */}
            <div class="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-white/[0.08] p-4 sm:p-6">
                {/* User Info */}
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div class="flex items-center gap-3 sm:gap-4">
                        <div class="relative">
                            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/[0.08] flex items-center justify-center shadow-lg">
                                <span class="text-lg font-semibold text-white">{generateAvatar(userData?.displayName || 'User')}</span>
                            </div>
                            <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div class="min-w-0">
                            <h1 class="text-xl font-semibold text-white truncate">Welcome back, {userData?.displayName || 'User'}!</h1>
                            <p class="text-sm text-gray-400 mt-0.5 flex items-center gap-2">
                                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                                <span class="hidden sm:block w-1 h-1 rounded-full bg-gray-600"></span>
                                <span class="hidden sm:block text-emerald-400">Online</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div class="p-3 sm:p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300 group">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-xl sm:text-2xl font-semibold text-white group-hover:text-emerald-400 transition-colors">{stats.dueToday}</div>
                                <div class="text-xs text-gray-400">Due Today</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 sm:p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300 group">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-xl sm:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">{stats.progress}%</div>
                                <div class="text-xs text-gray-400">Progress</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 sm:p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300 group">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-500">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-xl sm:text-2xl font-semibold text-white group-hover:text-purple-400 transition-colors">{stats.totalProjects}</div>
                                <div class="text-xs text-gray-400">Projects</div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 sm:p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300 group">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </div>
                            <div>
                                <div class="text-xl sm:text-2xl font-semibold text-white group-hover:text-amber-400 transition-colors">{stats.activeTasks}</div>
                                <div class="text-xs text-gray-400">Active Task</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Grid Layout */}
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
                {/* Project Overview Card */}
                <div class="w-full lg:col-span-8 space-y-6">
                    {/* Quick Actions & Insights */}
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                        {/* Quick Create Card */}
                        <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/[0.05] to-purple-500/10 border border-white/[0.08] hover:border-indigo-500/20 transition-all duration-300 cursor-pointer" onClick={navigateToProjects}>
                            <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/[0.02] to-indigo-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="relative p-4 sm:p-4 lg:p-5">
                                <div class="flex items-center justify-between mb-3 sm:mb-4">
                                    <div class="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <svg class="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 class="text-sm sm:text-base font-medium text-white mb-2">Quick Create</h3>
                                <p class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">New task or project</p>
                                <div class="flex items-center gap-1 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                                    <span class="text-xs font-medium">Create</span>
                                    <svg class="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Team Chat Card */}
                        <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/[0.05] to-teal-500/10 border border-white/[0.08] hover:border-emerald-500/20 transition-all duration-300 cursor-pointer" onClick={navigateToCommunications}>
                            <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/[0.02] to-emerald-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="relative p-4 sm:p-4 lg:p-5">
                                <div class="flex items-center justify-between mb-3 sm:mb-4">
                                    <div class="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                        <svg class="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 class="text-sm sm:text-base font-medium text-white mb-2">Team Chat</h3>
                                <p class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Coming soon</p>
                                <div class="flex items-center gap-1 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                    <span class="text-xs font-medium">Open Chat</span>
                                    <svg class="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Recent Files Card */}
                        <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/10 via-blue-500/[0.05] to-cyan-500/10 border border-white/[0.08] hover:border-blue-500/20 transition-all duration-300 sm:col-span-1 col-span-2 cursor-pointer" onClick={openFilesPopup}>
                            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.02] to-blue-500/[0.1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div class="relative p-4 sm:p-4 lg:p-5">
                                <div class="flex items-center justify-between mb-3 sm:mb-4">
                                    <div class="w-10 h-10 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <svg class="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 class="text-sm sm:text-base font-medium text-white mb-2">Recent Files</h3>
                                <p class="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">3 files updated recently</p>
                                <div class="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                                    <span class="text-xs font-medium">View All</span>
                                    <svg class="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Project Progress Chart */}
                    <div class="w-full p-6 rounded-xl bg-white/[0.05] border border-white/[0.05]">
                        <div class="flex items-center justify-between mb-6">
                            <h2 class="text-lg font-semibold text-white">Project Progress</h2>
                        </div>
                        <div class="h-[240px] flex items-end justify-between gap-2">
                            {(() => {
                                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                                const data = [];
                                const debug = [];
                                const allTasks = tasks;
                                const today = new Date();
                                const weekStart = new Date(today);
                                const dayOfWeek = today.getDay();
                                weekStart.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
                                weekStart.setHours(0, 0, 0, 0);
                                for (let i = 0; i < 7; i++) {
                                    const day = new Date(weekStart);
                                    day.setDate(weekStart.getDate() + i);
                                    day.setHours(0, 0, 0, 0);
                                    const dayEnd = new Date(day);
                                    dayEnd.setHours(23, 59, 59, 999);
                                    // Use only the date part for comparison
                                    const isSameDay = (d1, d2) =>
                                        d1.getFullYear() === d2.getFullYear() &&
                                        d1.getMonth() === d2.getMonth() &&
                                        d1.getDate() === d2.getDate();
                                    const isSameOrBefore = (d1, d2) => {
                                        return d1.getFullYear() < d2.getFullYear() ||
                                            (d1.getFullYear() === d2.getFullYear() && d1.getMonth() < d2.getMonth()) ||
                                            (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() <= d2.getDate());
                                    };
                                    // Tasks created up to this day
                                    const tasksUpToDay = allTasks.filter(task => {
                                        if (!task.createdAt) return false;
                                        const created = new Date(task.createdAt);
                                        return isSameOrBefore(created, dayEnd);
                                    });
                                    // Tasks completed ON this day
                                    const completedOnDay = tasksUpToDay.filter(task => {
                                        if (!task.completedAt) return false;
                                        const completed = new Date(task.completedAt);
                                        return isSameDay(completed, day);
                                    });
                                    const percentage = tasksUpToDay.length > 0 ? Math.round((completedOnDay.length / tasksUpToDay.length) * 100) : 0;
                                    data.push(Math.min(percentage, 100));
                                    debug.push({
                                        label: days[i],
                                        date: day.toISOString().slice(0, 10),
                                        created: tasksUpToDay.map(t => t.title),
                                        completedToday: completedOnDay.map(t => t.title),
                                        percentage
                                    });
                                }
                                console.log('Project Progress Debug:', debug);
                                return data.map((value, index) => (
                                    <div class="flex flex-col items-center gap-2 flex-1">
                                        <div class="w-full bg-white/[0.03] rounded-lg relative" style="height: 200px;">
                                            <div class="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-lg transition-all hover:bg-indigo-600" 
                                                 style={`height: ${value}%; cursor: pointer;`} 
                                                 title={`${value}% of tasks completed on ${days[index]}`}></div>
                                        </div>
                                        <div class="text-sm text-gray-400">{days[index]}</div>
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Kanban Board */}
                    <div class="w-full rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
                        <div class="p-4 lg:p-6 border-b border-white/[0.05]">
                            <div class="flex flex-row items-center justify-between gap-3">
                                <div class="flex items-center gap-3">
                                    <h2 class="text-lg font-semibold text-white">All Tasks</h2>
                                    <span class="hidden sm:inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-white/[0.05] text-gray-400">{tasks.length} tasks</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button 
                                        onClick={() => setShowExtendedKanban(true)}
                                        class="hidden md:flex px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 hover:text-indigo-300 border border-indigo-500/30 flex items-center gap-2"
                                    >
                                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                        <span class="hidden sm:inline">Extend</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="p-4 lg:p-6">
                            <div class="flex gap-4 overflow-x-auto pb-4 snap-x">
                                {(() => {
                                    const todoTasks = tasks.filter(task => 
                                        task.status === 'todo' || 
                                        task.status === 'To Do' || 
                                        task.status === 'Todo' ||
                                        task.status === 'TODO' ||
                                        task.status === 'pending'
                                    );
                                    const inProgressTasks = tasks.filter(task => 
                                        task.status === 'in-progress' || 
                                        task.status === 'In Progress' || 
                                        task.status === 'in_progress' ||
                                        task.status === 'InProgress' ||
                                        task.status === 'IN_PROGRESS'
                                    );
                                    const doneTasks = tasks.filter(task => 
                                        task.status === 'done' || 
                                        task.status === 'Done' || 
                                        task.status === 'DONE' ||
                                        task.status === 'completed'
                                    );

                                    const columns = [
                                        { title: 'To Do', color: 'gray-500', tasks: todoTasks },
                                        { title: 'In Progress', color: 'blue-500', tasks: inProgressTasks },
                                        { title: 'Done', color: 'emerald-500', tasks: doneTasks }
                                    ];

                                    return columns.map(column => (
                                        <div class="flex-shrink-0 w-[280px] snap-start">
                                            <div class="flex items-center justify-between mb-3">
                                                <div class="flex items-center gap-2">
                                                    <span class={`w-2 h-2 rounded-full bg-${column.color}`}></span>
                                                    <h3 class="text-sm font-medium text-white">{column.title}</h3>
                                                </div>
                                                <span class="text-xs text-gray-400">{column.tasks.length} tasks</span>
                                            </div>
                                            <div class="space-y-3 overflow-y-auto h-[200px] pr-2">
                                                {column.tasks.length > 0 ? column.tasks.slice(0, 8).map(task => (
                                                    <div class="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] transition-colors border border-white/[0.05] cursor-pointer">
                                                        <div class="flex items-start justify-between gap-2">
                                                            <h4 class="text-sm font-medium text-white">{task.title || 'Untitled Task'}</h4>
                                                            <span class={`flex-shrink-0 w-1.5 h-1.5 rounded-full bg-${getPriorityColor(task.priority || 'medium')} mt-1.5`}></span>
                                                        </div>
                                                        <p class="text-xs text-gray-400 mt-1 line-clamp-2">{task.description || 'No description'}</p>
                                                        <div class="flex items-center justify-between mt-3">
                                                            <div class="flex items-center gap-2">
                                                                <div class="flex -space-x-2">
                                                                    {task.assignedTo ? (
                                                                        <div class="w-6 h-6 rounded-full bg-indigo-500/20 border border-white/[0.05] flex items-center justify-center text-[10px] font-medium text-indigo-400">
                                                                            {generateAvatar(task.assignedToName || task.assignedTo)}
                                                                        </div>
                                                                    ) : (
                                                                        <div class="w-6 h-6 rounded-full bg-gray-500/20 border border-white/[0.05] flex items-center justify-center text-[10px] font-medium text-gray-400">
                                                                            U
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {task.projectName ? (
                                                                    <span class="text-xs text-gray-500 bg-white/[0.05] px-2 py-1 rounded-full">
                                                                        {task.projectName}
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <span class="text-xs text-gray-400">{getDueDateText(task.dueDate)}</span>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div class="p-3 rounded-lg bg-white/[0.02] border border-white/[0.03] text-center">
                                                        <p class="text-xs text-gray-500">No tasks</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div class="w-full lg:col-span-4 space-y-6">
                    {/* Firestore Usage Display */}
                    {/* <FirestoreUsageDisplay compact={true} showDetails={false} /> */}
                    
                    {/* Calendar Preview */}
                    <div class="w-full rounded-xl bg-white/[0.05] border border-white/[0.05] overflow-hidden">
                        <div class="px-6 py-4 border-b border-white/[0.05]">
                            <div class="flex items-center justify-between">
                                <h2 class="text-lg font-semibold text-white">Calendar</h2>
                                <div class="flex items-center gap-2">
                                    <button class="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors flex items-center justify-center text-gray-400 hover:text-white" onClick={goToPreviousMonth}>
                                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button class="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors flex items-center justify-center text-gray-400 hover:text-white" onClick={goToNextMonth}>
                                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="p-6">
                            {(() => {
                                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                                const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
                                const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                                
                                // Get events for this month (tasks due this month)
                                const monthEvents = tasks.filter(task => {
                                    if (task.dueDate) {
                                        const dueDate = new Date(task.dueDate);
                                        return dueDate.getMonth() === currentMonth.getMonth() && dueDate.getFullYear() === currentMonth.getFullYear();
                                    }
                                    return false;
                                }).map(task => ({
                                    title: task.title || 'Untitled Task',
                                    date: task.dueDate,
                                    time: getDueDateText(task.dueDate),
                                    type: 'task',
                                    priority: task.priority || 'medium',
                                    project: task.projectName
                                }));
                                
                                let calendar = (
                                    <div>
                                        <div class="text-center mb-4">
                                            <div class="text-lg font-semibold text-white">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</div>
                                        </div>
                                        <div class="grid grid-cols-7 gap-1 mb-2">
                                            {days.map(day => (
                                                <div class="text-center text-xs font-medium text-gray-400">{day}</div>
                                            ))}
                                        </div>
                                        <div class="grid grid-cols-7 gap-1">
                                            {/* Add empty cells for days before the first day of the month */}
                                            {Array.from({ length: firstDay }, (_, i) => (
                                                <div class="h-8 rounded-lg"></div>
                                            ))}
                                            
                                            {/* Add days of the month */}
                                            {Array.from({ length: daysInMonth }, (_, day) => {
                                                const dayNumber = day + 1;
                                                const today = new Date();
                                                const isToday = dayNumber === today.getDate() && 
                                                              currentMonth.getMonth() === today.getMonth() && 
                                                              currentMonth.getFullYear() === today.getFullYear();
                                                const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
                                                const dayEvents = monthEvents.filter(event => {
                                                    const eventDate = new Date(event.date);
                                                    return eventDate.getDate() === dayNumber;
                                                });
                                                
                                                const hasEvents = dayEvents.length > 0;
                                                const eventCount = dayEvents.length;
                                                
                                                return (
                                                    <div class={`relative h-8 rounded-lg ${isToday ? 'bg-indigo-500' : hasEvents ? 'bg-white/[0.05]' : ''} flex items-center justify-center cursor-pointer hover:bg-white/[0.08] transition-colors group`}>
                                                        <span class={`text-sm ${isToday ? 'text-white font-medium' : 'text-gray-400'}`}>{dayNumber}</span>
                                                        
                                                        {hasEvents ? (
                                                            <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex items-center gap-0.5">
                                                                {dayEvents.slice(0, 3).map((event, index) => (
                                                                    <div class={`w-1.5 h-1.5 rounded-full ${getEventTypeColor(event.type)}`}></div>
                                                                ))}
                                                                {eventCount > 3 ? <div class="w-1.5 h-1.5 rounded-full bg-gray-500"></div> : null}
                                                            </div>
                                                        ) : null}
                                                        
                                                        {/* Event Tooltip */}
                                                        {hasEvents ? (
                                                            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                                <div class="bg-gray-900/95 backdrop-blur-xl border border-white/[0.08] rounded-lg shadow-2xl p-3 min-w-[200px]">
                                                                    <div class="text-xs font-medium text-white mb-2">{dayDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                                                                    <div class="space-y-2">
                                                                        {dayEvents.slice(0, 5).map(event => (
                                                                            <div class="flex items-center gap-2">
                                                                                <div class={`w-2 h-2 rounded-full ${getEventTypeColor(event.type)}`}></div>
                                                                                <div class="flex-1 min-w-0">
                                                                                    <div class="text-xs font-medium text-white truncate">{event.title}</div>
                                                                                    <div class="text-xs text-gray-400">{event.type} • {event.time}</div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                        {eventCount > 5 ? <div class="text-xs text-gray-500">+{eventCount - 5} more events</div> : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                                
                                return calendar;
                            })()}
                        </div>
                    </div>

                    {/* Team Workload */}
                    <div class="w-full rounded-xl bg-white/[0.05] border border-white/[0.05] overflow-hidden h-[300px] flex flex-col">
                        <div class="px-6 py-4 border-b border-white/[0.05] flex-shrink-0">
                            <div class="flex items-center justify-between">
                                <h2 class="text-lg font-semibold text-white">Team Workload</h2>
                            </div>
                        </div>
                        <div class="p-6 flex-1 overflow-hidden">
                            {teamMembers.length === 0 ? (
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <p class="text-sm text-gray-500">No team members found</p>
                                    </div>
                                </div>
                            ) : (
                                <div class="h-full overflow-y-auto pr-2 space-y-4">
                                    {teamMembers.map(member => {
                                        // Use the new activeCount and workloadBar
                                        return (
                                            <div class="flex items-center gap-4">
                                                <div class="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-sm font-medium text-white">
                                                    {member.avatar}
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <div class="flex items-center justify-between mb-1">
                                                        <div class="text-sm font-medium text-white truncate">{member.name}</div>
                                                        <div class="text-sm text-gray-400">{member.activeCount} active</div>
                                                    </div>
                                                    <div class="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                                                        <div class="h-full rounded-full bg-indigo-500 transition-all duration-300" style={`width: ${member.workloadBar}%`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div class="w-full rounded-xl bg-white/[0.05] border border-white/[0.05] overflow-hidden h-[300px] flex flex-col">
                        <div class="px-6 py-4 border-b border-white/[0.05] flex-shrink-0">
                            <div class="flex items-center justify-between">
                                <h2 class="text-lg font-semibold text-white">Recent Activity</h2>
                            </div>
                        </div>
                        <div class="p-6 flex-1 overflow-hidden">
                            {recentActivity.length === 0 ? (
                                <div class="h-full flex items-center justify-center">
                                    <div class="text-center">
                                        <p class="text-sm text-gray-500">No recent activity</p>
                                    </div>
                                </div>
                            ) : (
                                <div class="h-full overflow-y-auto pr-2 space-y-4">
                                    {recentActivity.map(activity => (
                                        <div class="flex items-start gap-4">
                                            <div class={`w-8 h-8 rounded-lg bg-${activity.color}-500/20 flex items-center justify-center text-sm font-medium text-${activity.color}-500`}>
                                                {activity.avatar}
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm text-gray-300">
                                                    <span class="font-medium text-white">{activity.user}</span>
                                                    {' '}{activity.action}{' '}
                                                    <span class="font-medium text-white">{activity.target}</span>
                                                </p>
                                                <p class="text-xs text-gray-400 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Files Popup Modal */}
            {showFilesPopup && (
                <div class="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4" onClick={closeFilesPopup}>
                    <div class="bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl h-[70vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Header - Fixed Height */}
                        <div class="flex-shrink-0 p-4 sm:p-6 border-b border-white/[0.08] bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div class="min-w-0">
                                        <h2 class="text-lg sm:text-xl font-semibold text-white truncate">Recent Files</h2>
                                        <p class="text-sm text-gray-400 truncate">Recently uploaded documents and images</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={closeFilesPopup}
                                    class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white hover:scale-105"
                                >
                                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Content - Scrollable */}
                        <div class="flex-1 overflow-y-auto p-4 sm:p-6">
                            {filesLoading ? (
                                <div class="flex items-center justify-center py-8">
                                    <div class="flex items-center gap-3">
                                        <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span class="text-gray-400 text-sm">Loading files...</span>
                                    </div>
                                </div>
                            ) : recentFiles.length === 0 ? (
                                <div class="text-center py-8">
                                    <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                                        <svg class="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 class="text-lg sm:text-xl font-medium text-white mb-2">No files found</h3>
                                    <p class="text-gray-400 mb-4 text-sm">No files have been uploaded to any projects yet.</p>
                                    <div class="text-xs text-gray-500 space-y-1 bg-white/[0.02] rounded-lg p-3">
                                        <p class="font-medium">Debug Info:</p>
                                        <p>• Projects loaded: {projects.length}</p>
                                        <p>• Check browser console for detailed logs</p>
                                    </div>
                                </div>
                            ) : (
                                <div class="space-y-3">
                                    {/* Debug Info - Only show on mobile */}
                                    <div class="sm:hidden text-xs text-gray-500 mb-3 p-2 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                                        <p class="font-medium">Found {recentFiles.length} files from {projects.length} projects</p>
                                    </div>
                                    
                                    {recentFiles.map((file, index) => {
                                        const fileName = file.name || file.fileName || 'Unknown File';
                                        const fileSize = file.size || file.fileSize || 0;
                                        const fileDate = file.created_at || file.uploaded_at || file.uploadedAt || new Date();
                                        
                                        return (
                                            <div class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/[0.03] to-white/[0.02] hover:from-white/[0.05] hover:to-white/[0.03] transition-all duration-300 border border-white/[0.05] hover:border-white/[0.1] cursor-pointer">
                                                <div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.02] to-blue-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div class="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                                                    {/* File Icon */}
                                                    <div class="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] flex items-center justify-center text-xl sm:text-2xl">
                                                        {getFileIcon(fileName)}
                                                    </div>
                                                    
                                                    {/* File Info */}
                                                    <div class="flex-1 min-w-0">
                                                        <div class="flex items-center justify-between mb-1">
                                                            <h4 class="text-sm sm:text-base font-medium text-white truncate">{fileName}</h4>
                                                            <span class="text-xs text-gray-400 flex-shrink-0 ml-2">{formatFileSize(fileSize)}</span>
                                                        </div>
                                                        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-gray-400">
                                                            <span class="bg-white/[0.05] px-2 py-1 rounded-full text-xs w-fit">{file.projectName || 'Unknown Project'}</span>
                                                            <span class="text-gray-500">{new Date(fileDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Action Buttons */}
                                                    <div class="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        {/* Preview Button */}
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openFilePreview(file);
                                                            }}
                                                            class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white hover:scale-105"
                                                            title="Preview file"
                                                        >
                                                            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        
                                                        {/* Download Button */}
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (file.downloadURL) {
                                                                    window.open(file.downloadURL, '_blank');
                                                                }
                                                            }}
                                                            class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white hover:scale-105"
                                                            title="Download file"
                                                        >
                                                            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer - Fixed Height */}
                        <div class="flex-shrink-0 p-4 sm:p-6 border-t border-white/[0.08] bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div class="text-sm text-gray-400 text-center sm:text-left">
                                    {recentFiles.length} file{recentFiles.length !== 1 ? 's' : ''} found
                                </div>
                                <div class="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                                    <button 
                                        onClick={closeFilesPopup}
                                        class="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 text-gray-400 hover:text-white text-sm font-medium hover:scale-105"
                                    >
                                        Close
                                    </button>
                                    <button 
                                        onClick={() => {
                                            closeFilesPopup();
                                            navigateToProjects();
                                        }}
                                        class="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:scale-105"
                                    >
                                        View All Files
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* File Preview Modal */}
            {showPreview && selectedFile && (
                <div class="fixed inset-0 bg-black/80 backdrop-blur-lg z-[60] flex items-center justify-center p-3 sm:p-4" onClick={closeFilePreview}>
                    <div class="bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* Header */}
                        <div class="flex-shrink-0 p-4 sm:p-6 border-b border-white/[0.08] bg-gradient-to-r from-gray-900/50 to-gray-800/50">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        {isImageFile(selectedFile.name || selectedFile.fileName) ? (
                                            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        ) : (
                                            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div class="min-w-0">
                                        <h2 class="text-lg sm:text-xl font-semibold text-white truncate">{selectedFile.name || selectedFile.fileName}</h2>
                                        <p class="text-sm text-gray-400 truncate">{selectedFile.projectName || 'Unknown Project'}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    {/* Download Button */}
                                    {selectedFile.downloadURL && (
                                        <button 
                                            onClick={() => window.open(selectedFile.downloadURL, '_blank')}
                                            class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white hover:scale-105"
                                            title="Download file"
                                        >
                                            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </button>
                                    )}
                                    
                                    {/* Close Button */}
                                    <button 
                                        onClick={closeFilePreview}
                                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white hover:scale-105"
                                    >
                                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div class="flex-1 overflow-y-auto p-4 sm:p-6">
                            {isImageFile(selectedFile.name || selectedFile.fileName) ? (
                                /* Image Preview */
                                <div class="flex flex-col items-center justify-center h-full">
                                    <div class="relative w-full max-w-2xl mx-auto">
                                        <img 
                                            src={selectedFile.downloadURL} 
                                            alt={selectedFile.name || selectedFile.fileName}
                                            class="w-full h-auto max-h-[60vh] object-contain rounded-xl shadow-2xl border border-white/[0.08]"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextElementSibling.style.display = 'flex';
                                            }}
                                        />
                                        <div class="hidden absolute inset-0 bg-white/[0.02] rounded-xl border border-white/[0.08] flex items-center justify-center">
                                            <div class="text-center">
                                                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p class="text-gray-400">Image preview not available</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : isDocumentFile(selectedFile.name || selectedFile.fileName) ? (
                                /* Document Preview */
                                <div class="flex flex-col items-center justify-center h-full">
                                    <div class="w-full max-w-2xl mx-auto">
                                        <div class="bg-white/[0.02] rounded-xl border border-white/[0.08] p-8 text-center">
                                            <div class="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center">
                                                <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <h3 class="text-lg font-medium text-white mb-2">{selectedFile.name || selectedFile.fileName}</h3>
                                            <p class="text-gray-400 mb-4">Document preview not available in this view</p>
                                            {selectedFile.downloadURL && (
                                                <button 
                                                    onClick={() => window.open(selectedFile.downloadURL, '_blank')}
                                                    class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-white font-medium shadow-lg shadow-blue-500/25 hover:scale-105"
                                                >
                                                    Open Document
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Generic File Preview */
                                <div class="flex flex-col items-center justify-center h-full">
                                    <div class="w-full max-w-md mx-auto">
                                        <div class="bg-white/[0.02] rounded-xl border border-white/[0.08] p-8 text-center">
                                            <div class="w-20 h-20 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 border border-gray-500/20 flex items-center justify-center">
                                                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <h3 class="text-lg font-medium text-white mb-2">{selectedFile.name || selectedFile.fileName}</h3>
                                            <div class="space-y-2 text-sm text-gray-400 mb-6">
                                                <p>Size: {formatFileSize(selectedFile.size || selectedFile.fileSize)}</p>
                                                <p>Type: {selectedFile.fileType || 'Unknown'}</p>
                                                <p>Project: {selectedFile.projectName || 'Unknown Project'}</p>
                                                <p>Uploaded: {new Date(selectedFile.created_at || selectedFile.uploaded_at || selectedFile.uploadedAt || new Date()).toLocaleDateString()}</p>
                                            </div>
                                            {selectedFile.downloadURL && (
                                                <button 
                                                    onClick={() => window.open(selectedFile.downloadURL, '_blank')}
                                                    class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-white font-medium shadow-lg shadow-blue-500/25 hover:scale-105"
                                                >
                                                    Download File
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Extended Kanban Modal */}
            {showExtendedKanban && (
                <div class="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ top: '80px', left: '280px', right: '20px', bottom: '20px' }}>
                    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowExtendedKanban(false)} style={{ top: '80px', left: '280px', right: '20px', bottom: '20px' }}></div>
                    <div class="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl w-full h-full overflow-hidden">
                        {/* Header */}
                        <div class="bg-white/[0.03] border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <h3 class="text-xl font-semibold text-white">Extended Kanban Board</h3>
                                <span class="px-3 py-1 rounded-full text-sm bg-white/[0.05] text-gray-400">{tasks.length} total tasks</span>
                            </div>
                            <button 
                                onClick={() => setShowExtendedKanban(false)}
                                class="p-2 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors"
                            >
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Extended Kanban Content */}
                        <div class="p-6 h-full overflow-hidden">
                            <div class="flex gap-6 h-full overflow-x-auto pb-6 snap-x">
                                {(() => {
                                    const todoTasks = tasks.filter(task => 
                                        task.status === 'todo' || 
                                        task.status === 'To Do' || 
                                        task.status === 'Todo' ||
                                        task.status === 'TODO' ||
                                        task.status === 'pending'
                                    );
                                    const inProgressTasks = tasks.filter(task => 
                                        task.status === 'in-progress' || 
                                        task.status === 'In Progress' || 
                                        task.status === 'in_progress' ||
                                        task.status === 'InProgress' ||
                                        task.status === 'IN_PROGRESS'
                                    );
                                    const doneTasks = tasks.filter(task => 
                                        task.status === 'done' || 
                                        task.status === 'Done' || 
                                        task.status === 'DONE' ||
                                        task.status === 'completed'
                                    );

                                    const columns = [
                                        { title: 'To Do', color: 'gray-500', tasks: todoTasks },
                                        { title: 'In Progress', color: 'blue-500', tasks: inProgressTasks },
                                        { title: 'Done', color: 'emerald-500', tasks: doneTasks }
                                    ];

                                    return columns.map(column => (
                                        <div class="flex-shrink-0 w-[350px] snap-start h-full">
                                            <div class="bg-white/[0.05] rounded-xl border border-white/[0.08] h-full flex flex-col">
                                                <div class="p-4 border-b border-white/[0.08] flex-shrink-0">
                                                    <div class="flex items-center justify-between">
                                                        <div class="flex items-center gap-3">
                                                            <span class={`w-3 h-3 rounded-full bg-${column.color}`}></span>
                                                            <h3 class="text-lg font-semibold text-white">{column.title}</h3>
                                                        </div>
                                                        <span class="px-3 py-1 rounded-full text-sm bg-white/[0.05] text-gray-400 font-medium">
                                                            {column.tasks.length}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="p-4 space-y-4 overflow-y-auto flex-1">
                                                    {column.tasks.length === 0 ? (
                                                        <div class="text-center py-12">
                                                            <div class="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                                                                <svg class="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                                </svg>
                                                            </div>
                                                            <p class="text-sm text-gray-400">No tasks in this column</p>
                                                        </div>
                                                    ) : (
                                                        column.tasks.map(task => (
                                                            <div class="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-200 border border-white/[0.05] cursor-pointer group shadow-sm hover:shadow-md">
                                                                <div class="flex items-start justify-between gap-3 mb-3">
                                                                    <h4 class="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">{task.title || 'Untitled Task'}</h4>
                                                                    <span class={`flex-shrink-0 w-2 h-2 rounded-full bg-${getPriorityColor(task.priority || 'medium')} mt-1`}></span>
                                                                </div>
                                                                <p class="text-sm text-gray-400 mb-4 line-clamp-3">{task.description || 'No description provided'}</p>
                                                                
                                                                <div class="space-y-3">
                                                                    <div class="flex items-center justify-between">
                                                                        <div class="flex items-center gap-2">
                                                                            <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                                                                            <span class="text-sm text-gray-300 font-medium">{task.projectName || 'Unknown Project'}</span>
                                                                        </div>
                                                                        <span class="text-sm text-gray-400 font-medium">{getDueDateText(task.dueDate)}</span>
                                                                    </div>
                                                                    
                                                                    <div class="flex items-center justify-between">
                                                                        <div class="flex items-center gap-2">
                                                                            <div class="flex -space-x-2">
                                                                                {task.assignedTo ? (
                                                                                    <div class="w-6 h-6 rounded-full bg-indigo-500/20 border border-white/[0.05] flex items-center justify-center text-[10px] font-medium text-indigo-400">
                                                                                        {generateAvatar(task.assignedToName || task.assignedTo)}
                                                                                    </div>
                                                                                ) : (
                                                                                    <div class="w-6 h-6 rounded-full bg-gray-500/20 border border-white/[0.05] flex items-center justify-center text-[10px] font-medium text-gray-400">
                                                                                        U
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div class="flex items-center gap-1">
                                                                            <span class="text-xs text-gray-500">Priority:</span>
                                                                            <span class={`px-2 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(task.priority || 'medium')}/20 text-${getPriorityColor(task.priority || 'medium')}`}>
                                                                                {task.priority || 'medium'}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Overview; 