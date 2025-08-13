import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { 
    getCalendarEvents, 
    createCalendarEvent, 
    updateCalendarEvent, 
    deleteCalendarEvent, 
    getEventsForDate, 
    getUpcomingEvents,
    collection,
    getDocs,
    db,
    onSnapshot,
    query,
    where,
    orderBy
} from '../../../services/firebase.js';
import { geminiService } from '../../../services/gemini.js';
import { Toast } from '../../Toast.jsx';

const Calendar = () => {
    // State management
    const [view, setView] = useState('month'); // month, week, day
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [toast] = useState(() => new Toast());
    const [editingEvent, setEditingEvent] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showDayModal, setShowDayModal] = useState(false);
    
    // AI Event Creation States
    const [showAIModal, setShowAIModal] = useState(false);
    const [aiInputType, setAiInputType] = useState('text'); // text, image, pdf
    const [aiEventType, setAiEventType] = useState('personal'); // personal, global
    const [aiInputText, setAiInputText] = useState('');
    const [aiInputFile, setAiInputFile] = useState(null);
    const [aiContext, setAiContext] = useState('');
    const [aiProcessing, setAiProcessing] = useState(false);
    const [extractedEvents, setExtractedEvents] = useState([]);
    const [showExtractedEvents, setShowExtractedEvents] = useState(false);

    // Refs to store current data for real-time updates
    const eventsRef = useRef([]);
    const upcomingEventsRef = useRef([]);
    const teamMembersRef = useRef([]);

    // Categories configuration
    const categories = [
        { name: "Design", color: "indigo" },
        { name: "Client", color: "blue" },
        { name: "Testing", color: "amber" },
        { name: "Meeting", color: "emerald" },
        { name: "Review", color: "purple" },
        { name: "Training", color: "red" }
    ];

    // Initialize component
    useEffect(() => {
        let eventsUnsubscribe = null;
        let teamMembersUnsubscribe = null;
        
        const setupListeners = () => {
            // Set up real-time listeners
            eventsUnsubscribe = setupEventsListener();
            teamMembersUnsubscribe = setupTeamMembersListener();
        };
        
        setupListeners();
        
        return () => {
            if (eventsUnsubscribe) {
                eventsUnsubscribe();
            }
            if (teamMembersUnsubscribe) {
                teamMembersUnsubscribe();
            }
        };
    }, [view, currentDate]);

    useEffect(() => {
        if (editingEvent) {
            setEditForm({
                title: editingEvent.title || '',
                description: editingEvent.description || '',
                start: editingEvent.start ? editingEvent.start.slice(0, 16) : '',
                end: editingEvent.end ? editingEvent.end.slice(0, 16) : '',
                category: editingEvent.category?.name || '',
                location: editingEvent.location || '',
                priority: editingEvent.priority || 'medium',
                eventType: editingEvent.eventType || 'personal',
                attendees: editingEvent.attendees ? editingEvent.attendees.map(a => a.id) : []
            });
        }
    }, [editingEvent]);

    // Cleanup effect to ensure bottom nav is visible when component unmounts
    useEffect(() => {
        return () => {
            // Cleanup: ensure bottom nav is visible when component unmounts
            const bottomNav = document.querySelector('.bottom-nav');
            const bottomSpacing = document.querySelector('.lg\\:hidden.h-24');
            
            if (bottomNav) {
                bottomNav.style.transform = 'translateY(0)';
                bottomNav.style.opacity = '1';
                bottomNav.style.pointerEvents = 'auto';
                bottomNav.style.transition = '';
            }
            
            if (bottomSpacing) {
                bottomSpacing.style.height = '6rem';
            }
        };
    }, []);

    // Helper functions
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    const formatEventTime = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    const getStartOfWeek = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(d.setDate(diff));
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        const days = [];
        // Add previous month's days
        for (let i = 0; i < startingDay; i++) {
            const prevDate = new Date(year, month, -i);
            days.unshift({
                date: prevDate,
                isCurrentMonth: false,
                events: getEventsForDate(prevDate)
            });
        }
        
        // Add current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, month, i);
            days.push({
                date: currentDate,
                isCurrentMonth: true,
                events: getEventsForDate(currentDate)
            });
        }
        
        // Add next month's days to complete the grid
        const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
        for (let i = 1; i <= remainingDays; i++) {
            const nextDate = new Date(year, month + 1, i);
            days.push({
                date: nextDate,
                isCurrentMonth: false,
                events: getEventsForDate(nextDate)
            });
        }
        
        return days;
    };

    const getEventsForDate = (date) => {
        return eventsRef.current.filter(event => {
            const eventDate = new Date(event.start);
            return eventDate.getDate() === date.getDate() &&
                   eventDate.getMonth() === date.getMonth() &&
                   eventDate.getFullYear() === date.getFullYear();
        });
    };

    const getMemberColor = (role) => {
        const colors = {
            'admin': 'indigo',
            'member': 'emerald',
            'user': 'gray'
        };
        return colors[role] || 'gray';
    };

    // Navigation functions
    const toggleView = async (newView) => {
        setView(newView);
    };

    const navigateDate = (direction) => {
        const amount = direction === 'next' ? 1 : -1;
        const newDate = new Date(currentDate);
        
        switch (view) {
            case 'month':
                newDate.setMonth(newDate.getMonth() + amount);
                break;
            case 'week':
                newDate.setDate(newDate.getDate() + (7 * amount));
                break;
            case 'day':
                newDate.setDate(newDate.getDate() + amount);
                break;
        }
        setCurrentDate(newDate);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Real-time listener setup functions
    const setupEventsListener = () => {
        console.log('Setting up real-time events listener');
        setLoading(true);
        
        let startDate, endDate;
        
        // Get events based on current view
        switch (view) {
            case 'month':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                break;
            case 'week':
                startDate = getStartOfWeek(currentDate);
                endDate = new Date(startDate);
                endDate.setDate(startDate.getDate() + 6);
                break;
            case 'day':
                startDate = new Date(currentDate);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(currentDate);
                endDate.setHours(23, 59, 59, 999);
                break;
            default:
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        }
        
        // Real-time listener for calendar events
        const eventsCollectionRef = collection(db, 'calendarEvents');
        const eventsQuery = query(
            eventsCollectionRef,
            where('start', '>=', startDate.toISOString()),
            where('start', '<=', endDate.toISOString()),
            orderBy('start', 'asc')
        );
        
        const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
            const fetchedEvents = [];
            const currentUser = auth.currentUser;
            
            snapshot.forEach((doc) => {
                const eventData = doc.data();
                const event = {
                    id: doc.id,
                    ...eventData,
                    start: new Date(eventData.start),
                    end: new Date(eventData.end)
                };
                
                // Filter events based on type and user
                if (eventData.eventType === 'global' || 
                    (eventData.eventType === 'personal' && eventData.createdBy === currentUser?.uid) ||
                    !eventData.eventType) { // Backward compatibility for existing events
                    fetchedEvents.push(event);
                }
            });
            
            console.log('Calendar events updated:', fetchedEvents.length);
            setEvents(fetchedEvents);
            eventsRef.current = fetchedEvents;
            
            // Update upcoming events
            updateUpcomingEvents(fetchedEvents);
            setLoading(false);
        }, (error) => {
            console.error('Error listening to calendar events:', error);
            toast.show('Failed to load events', 'error');
            setLoading(false);
        });
        
        return unsubscribe;
    };

    const setupTeamMembersListener = () => {
        console.log('Setting up real-time team members listener');
        
        // Real-time listener for team members
        const usersCollectionRef = collection(db, 'users');
        const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            const members = [];
            snapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.email && userData.role) {
                    members.push({
                        id: doc.id,
                        name: userData.displayName || userData.email.split('@')[0],
                        email: userData.email,
                        role: userData.role,
                        initials: (userData.displayName || userData.email.split('@')[0]).split(' ').map(n => n[0]).join('').toUpperCase()
                    });
                }
            });
            
            console.log('Team members updated:', members.length);
            setTeamMembers(members);
            teamMembersRef.current = members;
        }, (error) => {
            console.error('Error listening to team members:', error);
            setTeamMembers([]);
        });
        
        return unsubscribe;
    };

    const updateUpcomingEvents = (allEvents) => {
        const now = new Date();
        const upcoming = allEvents
            .filter(event => new Date(event.start) >= now)
            .sort((a, b) => new Date(a.start) - new Date(b.start))
            .slice(0, 5);
        
        setUpcomingEvents(upcoming);
        upcomingEventsRef.current = upcoming;
    };



    // Modal functions
    // Function to hide/show bottom navigation
    const toggleBottomNav = (hide) => {
        const bottomNav = document.querySelector('.bottom-nav');
        const bottomSpacing = document.querySelector('.lg\\:hidden.h-24');
        
        if (bottomNav) {
            if (hide) {
                bottomNav.style.transform = 'translateY(100px)';
                bottomNav.style.opacity = '0';
                bottomNav.style.pointerEvents = 'none';
            } else {
                bottomNav.style.transform = 'translateY(0)';
                bottomNav.style.opacity = '1';
                bottomNav.style.pointerEvents = 'auto';
            }
        }
        
        if (bottomSpacing) {
            if (hide) {
                bottomSpacing.style.height = '0';
            } else {
                bottomSpacing.style.height = '6rem';
            }
        }
    };

    const showCreateEventModal = () => {
        setShowCreateModal(true);
        toggleBottomNav(true);
    };

    const closeCreateEventModal = () => {
        setShowCreateModal(false);
        toggleBottomNav(false);
    };

    const handleCreateEvent = async (eventData) => {
        try {
            await createCalendarEvent(eventData);
            toast.show('Event created successfully!', 'success');
            closeCreateEventModal();
            // No need to manually refresh - real-time listener will handle updates
        } catch (error) {
            console.error('Error creating event:', error);
            toast.show('Failed to create event', 'error');
        }
    };

    const handleCreateEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const categoryName = formData.get('category');
        const category = categories.find(cat => cat.name === categoryName);
        
        const eventData = {
            title: formData.get('title'),
            description: formData.get('description'),
            start: new Date(formData.get('start')).toISOString(),
            end: new Date(formData.get('end')).toISOString(),
            category: category,
            location: formData.get('location'),
            priority: formData.get('priority'),
            eventType: formData.get('eventType'),
            attendees: Array.from(e.target.querySelector('select[name="attendees"]').selectedOptions).map(option => {
                const member = teamMembersRef.current.find(m => m.id === option.value);
                return {
                    id: member.id,
                    name: member.name,
                    initials: member.initials,
                    color: getMemberColor(member.role)
                };
            })
        };

        await handleCreateEvent(eventData);
    };

    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setShowEditModal(true);
        toggleBottomNav(true);
    };

    const handleEditEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const categoryName = formData.get('category');
        const category = categories.find(cat => cat.name === categoryName);
        const updatedEvent = {
            ...editingEvent,
            title: formData.get('title'),
            description: formData.get('description'),
            start: new Date(formData.get('start')).toISOString(),
            end: new Date(formData.get('end')).toISOString(),
            category: category,
            location: formData.get('location'),
            priority: formData.get('priority'),
            eventType: formData.get('eventType'),
            attendees: Array.from(e.target.querySelector('select[name="attendees"]').selectedOptions).map(option => {
                const member = teamMembersRef.current.find(m => m.id === option.value);
                return {
                    id: member.id,
                    name: member.name,
                    initials: member.initials,
                    color: getMemberColor(member.role)
                };
            })
        };
        try {
            await updateCalendarEvent(updatedEvent);
            toast.show('Event updated successfully!', 'success');
            setShowEditModal(false);
            setEditingEvent(null);
            toggleBottomNav(false);
            // No need to manually refresh - real-time listener will handle updates
        } catch (error) {
            console.error('Error updating event:', error);
            toast.show('Failed to update event', 'error');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await deleteCalendarEvent(eventId);
            toast.show('Event deleted successfully!', 'success');
            setShowEditModal(false);
            setEditingEvent(null);
            // No need to manually refresh - real-time listener will handle updates
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.show('Failed to delete event', 'error');
        }
    };

    // AI Event Processing Functions
    const showAIEventModal = () => {
        setShowAIModal(true);
        setAiInputType('text');
        setAiEventType('personal');
        setAiInputText('');
        setAiInputFile(null);
        setAiContext('');
        setExtractedEvents([]);
        setShowExtractedEvents(false);
    };

    const closeAIEventModal = () => {
        setShowAIModal(false);
        setAiProcessing(false);
        setExtractedEvents([]);
        setShowExtractedEvents(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAiInputFile(file);
        }
    };

    const processAIInput = async () => {
        if (!aiInputText.trim() && !aiInputFile) {
            toast.show('Please provide text or upload a file', 'error');
            return;
        }

        setAiProcessing(true);
        try {
            let extractedEventsData = [];

            if (aiInputType === 'text') {
                extractedEventsData = await geminiService.extractEventsFromText(aiInputText, aiContext);
            } else if (aiInputType === 'image') {
                if (!aiInputFile) {
                    toast.show('Please select an image file', 'error');
                    return;
                }
                extractedEventsData = await geminiService.extractEventsFromImage(aiInputFile, aiContext);
            } else if (aiInputType === 'pdf') {
                if (!aiInputFile) {
                    toast.show('Please select a PDF file', 'error');
                    return;
                }
                extractedEventsData = await geminiService.extractEventsFromPDF(aiInputFile, aiContext);
            }

            setExtractedEvents(extractedEventsData);
            setShowExtractedEvents(true);
            toast.show(`Successfully extracted ${extractedEventsData.length} events`, 'success');
        } catch (error) {
            console.error('Error processing AI input:', error);
            toast.show(error.message || 'Failed to process input', 'error');
        } finally {
            setAiProcessing(false);
        }
    };

    const createEventsFromAI = async () => {
        if (extractedEvents.length === 0) {
            toast.show('No events to create', 'error');
            return;
        }

        setAiProcessing(true);
        try {
            const createdEvents = [];
            
            for (const eventData of extractedEvents) {
                const newEvent = {
                    title: eventData.title,
                    description: eventData.description || '',
                    start: eventData.start,
                    end: eventData.end,
                    category: categories.find(cat => cat.name === eventData.category) || categories[0],
                    location: eventData.location || '',
                    priority: eventData.priority || 'medium',
                    eventType: aiEventType,
                    attendees: []
                };

                const createdEvent = await createCalendarEvent(newEvent);
                createdEvents.push(createdEvent);
            }

            toast.show(`Successfully created ${createdEvents.length} events`, 'success');
            closeAIEventModal();
        } catch (error) {
            console.error('Error creating events from AI:', error);
            toast.show('Failed to create some events', 'error');
        } finally {
            setAiProcessing(false);
        }
    };

    // Helper functions for week and day views
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            const time = new Date();
            time.setHours(hour, 0, 0, 0);
            slots.push(time.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                hour12: true 
            }));
        }
        return slots;
    };

    const getEventsForTimeSlot = (date, timeSlot, events) => {
        const timeSlotHour = parseInt(timeSlot.split(':')[0]);
        const isPM = timeSlot.includes('PM');
        let hour = timeSlotHour;
        
        if (isPM && hour !== 12) hour += 12;
        if (!isPM && hour === 12) hour = 0;
        
        const eventsToUse = events || eventsRef.current;
        return eventsToUse.filter(event => {
            const eventStart = new Date(event.start);
            const eventDate = new Date(eventStart);
            eventDate.setHours(0, 0, 0, 0);
            const targetDate = new Date(date);
            targetDate.setHours(0, 0, 0, 0);
            
            return eventDate.getTime() === targetDate.getTime() && 
                   eventStart.getHours() === hour;
        });
    };

    // Helper to get the highest priority color for a day's events
    const getDayHighlightColor = (events) => {
        if (!events || events.length === 0) return '';
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        let topEvent = events[0];
        for (const event of events) {
            if (priorityOrder[event.priority] > priorityOrder[topEvent.priority]) {
                topEvent = event;
            }
        }
        return topEvent.category.color;
    };

    // Render functions for different views
    const renderMonthView = () => {
        return (
            <div class="h-full flex flex-col">
                <div class="grid grid-cols-7 text-center border-b border-white/[0.08] flex-shrink-0">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div class="py-2 text-sm font-medium text-gray-400">{day}</div>
                    ))}
                </div>
                <div class="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-white/[0.08] flex-1 overflow-y-auto">
                    {getDaysInMonth(currentDate).map(({ date, isCurrentMonth, events }) => {
                        const highlightColor = getDayHighlightColor(events);
                        const highlightClass = events.length > 0 ? `bg-${highlightColor}-500/20 border border-${highlightColor}-500/30 shadow-lg` : '';
                        return (
                            <div 
                                class={`min-h-[120px] p-2 rounded-xl transition-all duration-200 cursor-pointer ${isCurrentMonth ? '' : 'bg-white/[0.02]'} ${highlightClass}`}
                                onClick={() => { if (events.length > 0) { setSelectedDay({ date, events }); setShowDayModal(true); } }}
                            >
                            <div class="flex items-center justify-between mb-2">
                                    <span class={`text-sm ${isCurrentMonth ? 'text-white' : 'text-gray-600'} ${date.toDateString() === new Date().toDateString() ? 'font-medium' : ''}`}>{date.getDate()}</span>
                                {events.length > 0 && (
                                    <span class="text-xs text-gray-400">{events.length} event{events.length > 1 ? 's' : ''}</span>
                                )}
                            </div>
                            <div class="space-y-1">
                                    {events.slice(0, 2).map(event => (
                                        <div class={`p-1 rounded bg-${event.category.color}-500/30 text-${event.category.color}-200 text-xs truncate flex items-center gap-1`}>
                                            <span>{formatEventTime(event.start)} {event.title}</span>
                                            {event.eventType === 'personal' && (
                                                <span class="ml-auto px-1 rounded text-[10px] bg-blue-500/20 text-blue-300">P</span>
                                            )}
                                            {event.eventType === 'global' && (
                                                <span class="ml-auto px-1 rounded text-[10px] bg-green-500/20 text-green-300">G</span>
                                            )}
                                        </div>
                                ))}
                                    {events.length > 2 && <div class="text-xs text-gray-400">+{events.length - 2} more</div>}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderWeekView = () => {
        const startOfWeek = getStartOfWeek(currentDate);
        const days = [];
        
        // Generate 7 days starting from the start of the week
        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            days.push({
                date,
                events: getEventsForDate(date)
            });
        }

        return (
            <div class="flex flex-col h-full">
                {/* Week Header */}
                <div class="grid grid-cols-8 border-b border-white/[0.08] flex-shrink-0">
                    <div class="p-2 lg:p-3"></div> {/* Empty corner */}
                    {days.map(({ date, events }) => (
                        <div class="p-2 lg:p-3 text-center border-l border-white/[0.08]">
                            <div class="text-xs lg:text-sm font-medium text-gray-400 mb-1">
                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div class={`text-base lg:text-lg font-semibold text-white ${date.toDateString() === new Date().toDateString() ? 'bg-indigo-500 rounded-lg w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center mx-auto' : ''}`}>
                                {date.getDate()}
                            </div>
                            {events.length > 0 && (
                                <div class="mt-1 text-[10px] lg:text-xs text-gray-400">{events.length} event{events.length > 1 ? 's' : ''}</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Time Grid */}
                <div class="flex-1 overflow-y-auto">
                    <div class="grid grid-cols-8 divide-x divide-white/[0.08]">
                        {/* Time Column */}
                        <div class="border-r border-white/[0.08]">
                            {generateTimeSlots().map(time => (
                                <div class="h-12 lg:h-16 border-b border-white/[0.08] flex items-center justify-center">
                                    <span class="text-[10px] lg:text-xs text-gray-400">{time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Day Columns */}
                        {days.map(({ date, events }) => (
                            <div class="relative">
                                {generateTimeSlots().map(time => (
                                    <div class="h-12 lg:h-16 border-b border-white/[0.08] relative">
                                        {getEventsForTimeSlot(date, time, events).map(event => (
                                            <div 
                                                class={`absolute left-0.5 right-0.5 lg:left-1 lg:right-1 top-0.5 bottom-0.5 lg:top-1 lg:bottom-1 bg-${event.category.color}-500/20 border border-${event.category.color}-500/30 rounded p-0.5 lg:p-1 text-[10px] lg:text-xs overflow-hidden cursor-pointer group hover:bg-${event.category.color}-500/30 transition-colors`}
                                                onClick={() => handleEditEvent(event)}
                                            >
                                                <div class={`font-medium text-${event.category.color}-400 truncate`}>{event.title}</div>
                                                <div class={`text-${event.category.color}-300 text-[8px] lg:text-[10px]`}>{formatEventTime(event.start)}</div>
                                                <div class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        class="p-0.5 text-red-400 hover:text-red-300 text-[8px]" 
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }}
                                                        title="Delete event"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderDayView = () => {
        const currentDateEvents = getEventsForDate(currentDate);
        const sortedEvents = currentDateEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

        return (
            <div class="flex flex-col h-full">
                {/* Day Header */}
                <div class="p-4 lg:p-6 border-b border-white/[0.08] flex-shrink-0">
                    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h2 class="text-xl lg:text-2xl font-semibold text-white">
                                {currentDate.toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </h2>
                            <p class="text-gray-400 mt-1">{sortedEvents.length} event{sortedEvents.length !== 1 ? 's' : ''} scheduled</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <button 
                                onClick={showCreateEventModal}
                                class="px-3 lg:px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                <svg class="w-4 h-4 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span class="hidden sm:inline">Add Event</span>
                                <span class="sm:hidden">Add</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Events List */}
                <div class="flex-1 overflow-y-auto p-4 lg:p-6">
                    {sortedEvents.length === 0 ? (
                        <div class="text-center py-8 lg:py-12">
                            <div class="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-full bg-white/[0.05] flex items-center justify-center">
                                <svg class="w-6 h-6 lg:w-8 lg:h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 class="text-base lg:text-lg font-medium text-white mb-2">No events scheduled</h3>
                            <p class="text-gray-400 mb-4 text-sm lg:text-base">This day is free. Click "Add Event" to schedule something.</p>
                            <button 
                                onClick={showCreateEventModal}
                                class="px-3 lg:px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors text-sm font-medium"
                            >
                                Schedule Event
                            </button>
                        </div>
                    ) : (
                        <div class="space-y-3 lg:space-y-4">
                            {sortedEvents.map(event => (
                                <div class="bg-white/[0.03] border border-white/[0.08] rounded-lg p-3 lg:p-4 hover:bg-white/[0.05] transition-colors cursor-pointer group">
                                    <div class="flex items-start justify-between gap-3 lg:gap-4">
                                        <div class="flex-1">
                                            <div class="flex flex-wrap items-center gap-2 lg:gap-3 mb-2">
                                                <h3 class="text-base lg:text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                                                <span class={`px-2 py-1 rounded-md text-xs font-medium bg-${event.category.color}-500/20 text-${event.category.color}-400`}>
                                                    {event.category.name}
                                                </span>
                                                {event.priority === 'high' ? (
                                                    <span class="px-2 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-400">
                                                        High Priority
                                                    </span>
                                                ) : event.priority === 'medium' ? (
                                                    <span class="px-2 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-400">
                                                        Medium Priority
                                                    </span>
                                                ) : (
                                                    <span class="px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                                        Low Priority
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {event.description && (
                                                <p class="text-gray-400 text-sm mb-3">{event.description}</p>
                                            )}
                                            
                                            <div class="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-6 text-sm text-gray-400">
                                                <div class="flex items-center gap-2">
                                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {formatEventTime(event.start)} - {formatEventTime(event.end)}
                                                </div>
                                                {event.location && (
                                                    <div class="flex items-center gap-2">
                                                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {event.location}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {event.attendees && event.attendees.length > 0 && (
                                                <div class="mt-3">
                                                    <div class="flex items-center gap-2 mb-2">
                                                        <span class="text-xs text-gray-400">Attendees:</span>
                                                    </div>
                                                    <div class="flex flex-wrap items-center gap-2">
                                                        {event.attendees.map(attendee => (
                                                            <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.05] border border-white/[0.08]">
                                                                <div class={`w-5 h-5 rounded-full bg-${attendee.color}-500/20 border border-white/[0.05] flex items-center justify-center text-[10px] font-medium text-${attendee.color}-400`}>
                                                                    {attendee.initials}
                                                                </div>
                                                                <span class="text-xs text-gray-300">{attendee.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div class="flex items-center gap-1 lg:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                            <button class="p-1.5 lg:p-2 text-gray-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-white/[0.05]" title="Edit event" onClick={() => handleEditEvent(event)}>
                                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button class="p-1.5 lg:p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/[0.05]" title="Delete event" onClick={() => handleDeleteEvent(event.id)}>
                                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Basic render for now
    return (
        <div class="px-4 space-y-6 pb-20 lg:pb-6">
            {/* Header Section */}
            <div class="bg-white/[0.02] rounded-xl border border-white/[0.05] p-4 lg:p-6">
                {/* Main Header */}
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6 mb-4 lg:mb-0">
                    {/* Left Section */}
                    <div class="flex items-start lg:items-center gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-center gap-3">
                                    <h1 class="text-xl lg:text-2xl font-bold text-white">Calendar</h1>
                                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                        {view.charAt(0).toUpperCase() + view.slice(1)} View
                                    </span>
                                </div>
                                <p class="text-gray-400 mt-1 text-sm">Schedule and manage your events</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Desktop */}
                    <div class="hidden lg:flex items-center gap-3">
                        {/* View Toggle */}
                        <div class="flex items-center rounded-xl bg-white/[0.05] p-1 border border-white/[0.08]">
                            <button 
                                onClick={() => toggleView('month')}
                                class={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'month' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                Month
                            </button>
                            <button 
                                onClick={() => toggleView('week')}
                                class={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'week' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                Week
                            </button>
                            <button 
                                onClick={() => toggleView('day')}
                                class={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'day' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                Day
                            </button>
                        </div>

                        {/* Navigation Buttons */}
                        <div class="flex items-center gap-2">
                            <button 
                                onClick={() => navigateDate('prev')}
                                class="h-10 w-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                onClick={goToToday}
                                class="h-10 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white text-sm font-medium"
                            >
                                Today
                            </button>
                            <button 
                                onClick={() => navigateDate('next')}
                                class="h-10 w-10 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Create Event Buttons */}
                        <div class="flex gap-2">
                            <button
                                onClick={showCreateEventModal}
                                class="h-10 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>New Event</span>
                            </button>
                            <button
                                onClick={showAIEventModal}
                                class="h-10 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                title="AI-powered event creation from text, images, or PDFs"
                            >
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <span>AI Create</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Actions - Column Grid Layout */}
                <div class="lg:hidden space-y-4">
                    {/* Search Row */}
                    <div class="relative">
                        <input 
                            type="text" 
                            placeholder="Search events..." 
                            class="w-full h-12 px-4 pl-12 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-indigo-500 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                        />
                        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* View Toggle Row */}
                    <div class="flex items-center justify-center">
                        <div class="flex items-center rounded-xl bg-white/[0.05] p-1 border border-white/[0.08]">
                            <button 
                                onClick={() => toggleView('month')}
                                class={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'month' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                Month
                            </button>
                            <button 
                                onClick={() => toggleView('week')}
                                class={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'week' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                Week
                            </button>
                            <button 
                                onClick={() => toggleView('day')}
                                class={`px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'day' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'}`}
                            >
                                Day
                            </button>
                        </div>
                    </div>

                    {/* Navigation Row */}
                    <div class="flex items-center justify-center gap-3">
                        <button 
                            onClick={() => navigateDate('prev')}
                            class="h-12 w-12 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
                        >
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={goToToday}
                            class="h-12 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white text-sm font-medium"
                        >
                            Today
                        </button>
                        <button 
                            onClick={() => navigateDate('next')}
                            class="h-12 w-12 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] transition-all duration-200 flex items-center justify-center text-gray-400 hover:text-white"
                        >
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Create Event Button Row */}
                    <div class="flex flex-col gap-3">
                        <button
                            onClick={showCreateEventModal}
                            class="w-full h-12 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                        >
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Create New Event</span>
                        </button>
                        <button
                            onClick={showAIEventModal}
                            class="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                        >
                            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span>AI Create Event</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Event Count - Only show on mobile */}
                <div class="lg:hidden flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span class="text-sm text-gray-400">Upcoming events</span>
                    </div>
                    <span class="text-sm font-semibold text-white">{upcomingEvents.length} scheduled</span>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div class="flex items-center justify-center py-12">
                    <div class="text-center">
                        <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                            <svg class="w-6 h-6 text-indigo-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <p class="text-sm text-gray-400">Loading calendar...</p>
                    </div>
                </div>
            )}

            {/* Calendar Content */}
            {!loading && (
                <div class="grid lg:grid-cols-7 gap-4">
                    {/* Mini Calendar (Desktop Sidebar) */}
                    <div class="lg:col-span-2 space-y-4">
                        <div class="p-4 rounded-xl bg-white/[0.05] border border-white/[0.08]">
                            <div class="text-lg font-medium text-white mb-4">{formatDate(currentDate)}</div>
                            <div class="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div>{day}</div>
                                ))}
                            </div>
                            <div class="grid grid-cols-7 gap-1">
                                {getDaysInMonth(currentDate).map(({ date, isCurrentMonth, events }) => (
                                    <div class="aspect-square flex items-center justify-center">
                                        <button class={`w-8 h-8 rounded-lg flex items-center justify-center text-sm relative
                                            ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                                            ${date.toDateString() === new Date().toDateString() ? 'bg-indigo-500' : 'hover:bg-white/[0.05]'}
                                            ${events.length > 0 ? 'font-medium' : ''}`}>
                                            {date.getDate()}
                                            {events.length > 0 && (
                                                <span class="absolute bottom-0.5 w-1 h-1 rounded-full bg-indigo-400"></span>
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div class="p-4 rounded-xl bg-white/[0.05] h-[250px] overflow-y-auto border border-white/[0.08]">
                            <h3 class="text-sm font-medium text-white mb-3">Upcoming Events</h3>
                            <div class="space-y-3">
                                {upcomingEvents.length === 0 ? (
                                    <div class="text-center py-8">
                                        <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-white/[0.05] flex items-center justify-center">
                                            <svg class="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p class="text-gray-400 text-sm font-medium">No upcoming events</p>
                                        <p class="text-gray-500 text-xs mt-1">Your schedule is clear</p>
                                    </div>
                                ) : (
                                    upcomingEvents.map((event, index) => {
                                        const eventDate = new Date(event.start);
                                        const isToday = eventDate.toDateString() === new Date().toDateString();
                                        const isTomorrow = eventDate.toDateString() === new Date(Date.now() + 86400000).toDateString();
                                        
                                        let dateLabel = '';
                                        if (isToday) {
                                            dateLabel = 'Today';
                                        } else if (isTomorrow) {
                                            dateLabel = 'Tomorrow';
                                        } else {
                                            dateLabel = eventDate.toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric' 
                                            });
                                        }

                                        return (
                                            <div class="group relative">
                                                <div class="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-200 border border-white/[0.08] cursor-pointer group-hover:border-white/[0.12] group-hover:shadow-lg">
                                                    <div class="flex items-start justify-between gap-3 mb-3">
                                                        <div class="flex-shrink-0">
                                                            <div class={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                                                                isToday 
                                                                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                                                                    : isTomorrow 
                                                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                                    : 'bg-white/[0.08] text-gray-300 border border-white/[0.12]'
                                                            }`}>
                                                                {dateLabel}
                                                            </div>
                                                        </div>
                                                        <div class="flex-shrink-0 flex gap-2">
                                                            <span class={`px-2.5 py-1 rounded-lg text-xs font-medium bg-${event.category.color}-500/15 text-${event.category.color}-400 border border-${event.category.color}-500/25`}>
                                                                {event.category.name}
                                                            </span>
                                                            {event.eventType === 'personal' && (
                                                                <span class="px-2 py-1 rounded-lg text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/25">
                                                                    Personal
                                                                </span>
                                                            )}
                                                            {event.eventType === 'global' && (
                                                                <span class="px-2 py-1 rounded-lg text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/25">
                                                                    Global
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <h4 class="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors mb-3 leading-tight">
                                                        {event.title}
                                                    </h4>
                                                    <div class="space-y-2.5">
                                                        <div class="flex items-center gap-2.5 text-xs text-gray-400">
                                                            <div class="w-4 h-4 rounded-full bg-white/[0.08] flex items-center justify-center flex-shrink-0">
                                                                <svg class="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <span class="font-medium">{formatEventTime(event.start)}</span>
                                                        </div>
                                                    </div>
                                                    <div class="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r-xl"></div>
                                                </div>
                                                {index < upcomingEvents.length - 1 && (
                                                    <div class="h-px bg-white/[0.05] my-3 mx-4"></div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Calendar View */}
                    <div class="lg:col-span-5 rounded-xl bg-white/[0.05] border border-white/[0.08] overflow-hidden h-[600px] lg:h-[700px]">
                        {view === 'month' && renderMonthView()}
                        {view === 'week' && renderWeekView()}
                        {view === 'day' && renderDayView()}
                    </div>
                </div>
            )}

            {/* Create Event Offcanvas */}
            {showCreateModal && (
                <div class="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <div 
                        class="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                        onClick={closeCreateEventModal}
                    ></div>
                    
                    {/* Offcanvas */}
                    <div class="absolute right-0 top-10 h-[calc(100vh-4rem)] w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-white/[0.08] shadow-2xl transform transition-transform duration-300 ease-out z-50">
                        <div class="h-full flex flex-col">
                            {/* Header */}
                            <div class="flex items-center justify-between p-6 border-b border-white/[0.08] flex-shrink-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
                                <div>
                                    <h2 class="text-xl font-semibold text-white">Create New Event</h2>
                                    <p class="text-sm text-gray-400 mt-1">Schedule your upcoming event</p>
                                </div>
                                <button
                                    onClick={closeCreateEventModal}
                                    class="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                                >
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <div class="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-900/50 to-gray-800/30">
                                <form id="create-event-form" onSubmit={handleCreateEventSubmit} class="space-y-6">
                                    {/* Event Title */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Event Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            placeholder="Enter event title"
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Event Type */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Event Type *</label>
                                        <select
                                            name="eventType"
                                            required
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            <option value="" class="bg-gray-800">Select event type</option>
                                            <option value="personal" class="bg-gray-800">Personal Event (Only you)</option>
                                            <option value="global" class="bg-gray-800">Global Event (Team visible)</option>
                                        </select>
                                        <p class="text-xs text-gray-500 mt-1">Personal events are only visible to you, global events are visible to all team members</p>
                                    </div>

                                    {/* Description */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            placeholder="Enter event description"
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none backdrop-blur-sm"
                                        ></textarea>
                                    </div>

                                    {/* Start Date & Time */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Start Date & Time *</label>
                                        <input
                                            type="datetime-local"
                                            name="start"
                                            required
                                            defaultValue={new Date().toISOString().slice(0, 16)}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* End Date & Time */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">End Date & Time *</label>
                                        <input
                                            type="datetime-local"
                                            name="end"
                                            required
                                            defaultValue={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Category *</label>
                                        <select
                                            name="category"
                                            required
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            <option value="" class="bg-gray-800">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat.name} value={cat.name} class="bg-gray-800">{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Location */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Enter location or meeting link"
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Priority */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Priority</label>
                                        <select
                                            name="priority"
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            <option value="low" class="bg-gray-800">Low Priority</option>
                                            <option value="medium" selected class="bg-gray-800">Medium Priority</option>
                                            <option value="high" class="bg-gray-800">High Priority</option>
                                        </select>
                                    </div>

                                    {/* Attendees */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Attendees</label>
                                        <select
                                            name="attendees"
                                            multiple
                                            size="3"
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            {teamMembers.map(member => (
                                                <option key={member.id} value={member.id} class="bg-gray-800">
                                                    {member.name} • {member.role}
                                                </option>
                                            ))}
                                        </select>
                                        <p class="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple attendees</p>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div class="p-6 border-t border-white/[0.08] flex-shrink-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
                                <div class="flex gap-3">
                                    <button
                                        onClick={closeCreateEventModal}
                                        class="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white transition-colors font-medium backdrop-blur-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        form="create-event-form"
                                        class="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all font-medium shadow-lg hover:shadow-indigo-500/25"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Event Offcanvas */}
            {showEditModal && (
                <div class="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <div 
                        class="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                        onClick={() => setShowEditModal(false)}
                    ></div>
                    
                    {/* Offcanvas */}
                    <div class="absolute right-0 top-10 h-[calc(100vh-4rem)] w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-white/[0.08] shadow-2xl transform transition-transform duration-300 ease-out z-50">
                        <div class="h-full flex flex-col">
                            {/* Header */}
                            <div class="flex items-center justify-between p-6 border-b border-white/[0.08] flex-shrink-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
                                <div>
                                    <h2 class="text-xl font-semibold text-white">Edit Event</h2>
                                    <p class="text-sm text-gray-400 mt-1">Update your event details</p>
                                </div>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    class="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                                >
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Form */}
                            <div class="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-900/50 to-gray-800/30">
                                <form id="edit-event-form" onSubmit={handleEditEventSubmit} class="space-y-6">
                                    {/* Event Title */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Event Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            required
                                            value={editForm?.title}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Event Type */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Event Type *</label>
                                        <select
                                            name="eventType"
                                            required
                                            value={editForm?.eventType || 'personal'}
                                            onChange={(e) => setEditForm({ ...editForm, eventType: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            <option value="personal" class="bg-gray-800">Personal Event (Only you)</option>
                                            <option value="global" class="bg-gray-800">Global Event (Team visible)</option>
                                        </select>
                                        <p class="text-xs text-gray-500 mt-1">Personal events are only visible to you, global events are visible to all team members</p>
                                    </div>

                                    {/* Description */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Description</label>
                                        <textarea
                                            name="description"
                                            rows="3"
                                            value={editForm?.description}
                                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none backdrop-blur-sm"
                                        ></textarea>
                                    </div>

                                    {/* Start Date & Time */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Start Date & Time *</label>
                                        <input
                                            type="datetime-local"
                                            name="start"
                                            required
                                            value={editForm?.start}
                                            onChange={(e) => setEditForm({ ...editForm, start: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* End Date & Time */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">End Date & Time *</label>
                                        <input
                                            type="datetime-local"
                                            name="end"
                                            required
                                            value={editForm?.end}
                                            onChange={(e) => setEditForm({ ...editForm, end: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Category *</label>
                                        <select
                                            name="category"
                                            required
                                            value={editForm?.category}
                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            <option value="" class="bg-gray-800">Select a category</option>
                                            {categories.map(cat => (
                                                <option key={cat.name} value={cat.name} class="bg-gray-800">{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Location */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={editForm?.location}
                                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Priority */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Priority</label>
                                        <select
                                            name="priority"
                                            value={editForm?.priority}
                                            onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            <option value="low" class="bg-gray-800">Low Priority</option>
                                            <option value="medium" class="bg-gray-800">Medium Priority</option>
                                            <option value="high" class="bg-gray-800">High Priority</option>
                                        </select>
                                    </div>

                                    {/* Attendees */}
                                    <div class="space-y-2">
                                        <label class="block text-sm font-medium text-white">Attendees</label>
                                        <select
                                            name="attendees"
                                            multiple
                                            size="3"
                                            value={editForm?.attendees}
                                            onChange={(e) => setEditForm({ ...editForm, attendees: Array.from(e.target.selectedOptions, option => option.value) })}
                                            class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                                        >
                                            {teamMembers.map(member => (
                                                <option key={member.id} value={member.id} class="bg-gray-800">
                                                    {member.name} • {member.role}
                                                </option>
                                            ))}
                                        </select>
                                        <p class="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple attendees</p>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div class="p-6 border-t border-white/[0.08] flex-shrink-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
                                <div class="flex gap-3">
                                    <button
                                        onClick={() => setShowEditModal(false)}
                                        class="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white transition-colors font-medium backdrop-blur-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        form="edit-event-form"
                                        class="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all font-medium shadow-lg hover:shadow-indigo-500/25"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Day Modal */}
            {showDayModal && selectedDay && (
                <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div class="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowDayModal(false)}></div>
                    <div class="relative bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                        <div class="bg-gradient-to-r from-white/[0.09] to-transparent px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
                            <div>
                                <div class="text-lg font-semibold text-white">{selectedDay.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                                <div class="text-xs text-gray-400">{selectedDay.events.length} event{selectedDay.events.length !== 1 ? 's' : ''}</div>
                            </div>
                            <button onClick={() => setShowDayModal(false)} class="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div class="p-6 space-y-4">
                            {selectedDay.events.map(event => (
                                <div class={`rounded-xl p-4 border border-${event.category.color}-500/20 bg-${event.category.color}-500/10 flex flex-col gap-2 shadow-sm`}> 
                                    <div class="flex items-center gap-2 mb-1">
                                        <span class={`px-2 py-1 rounded text-xs font-semibold bg-${event.category.color}-500/20 text-${event.category.color}-400`}>{event.category.name}</span>
                                        {event.priority === 'high' && <span class="px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400">High</span>}
                                        {event.priority === 'medium' && <span class="px-2 py-1 rounded text-xs font-semibold bg-amber-500/20 text-amber-400">Medium</span>}
                                        {event.priority === 'low' && <span class="px-2 py-1 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400">Low</span>}
                                    </div>
                                    <div class="text-white font-medium text-base">{event.title}</div>
                                    <div class="text-gray-400 text-xs">{formatEventTime(event.start)} - {formatEventTime(event.end)}</div>
                                    {event.description && <div class="text-gray-300 text-xs mb-1">{event.description}</div>}
                                    <div class="flex gap-2 mt-2">
                                        <button onClick={() => { setShowDayModal(false); handleEditEvent(event); }} class="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium shadow hover:shadow-indigo-500/25 transition-all">Edit</button>
                                        <button onClick={() => { setShowDayModal(false); handleDeleteEvent(event.id); }} class="flex-1 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium shadow hover:shadow-red-500/25 transition-all">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* AI Event Creation Offcanvas */}
            {showAIModal && (
                <div class="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <div 
                        class="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                        onClick={closeAIEventModal}
                    ></div>
                    
                    {/* Offcanvas */}
                    <div class="absolute right-0 top-10 h-[calc(100vh-4rem)] w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-white/[0.08] shadow-2xl transform transition-transform duration-300 ease-out z-50">
                        <div class="h-full flex flex-col">
                            {/* Header */}
                            <div class="flex items-center justify-between p-6 border-b border-white/[0.08] flex-shrink-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
                                <div>
                                    <h2 class="text-xl font-semibold text-white">AI Event Creation</h2>
                                    <p class="text-sm text-gray-400 mt-1">Extract events from text, images, or PDFs using AI</p>
                                </div>
                                <button
                                    onClick={closeAIEventModal}
                                    class="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors flex items-center justify-center text-gray-400 hover:text-white"
                                >
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div class="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-gray-900/50 to-gray-800/30">
                                {!showExtractedEvents ? (
                                    <div class="space-y-6">
                                        {/* Input Type Selection */}
                                        <div class="space-y-3">
                                            <label class="block text-sm font-medium text-white">Input Type</label>
                                            <div class="flex gap-3">
                                                <button
                                                    onClick={() => setAiInputType('text')}
                                                    class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        aiInputType === 'text' 
                                                            ? 'bg-indigo-500 text-white' 
                                                            : 'bg-white/[0.05] text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    Text
                                                </button>
                                                <button
                                                    onClick={() => setAiInputType('image')}
                                                    class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        aiInputType === 'image' 
                                                            ? 'bg-indigo-500 text-white' 
                                                            : 'bg-white/[0.05] text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    Image
                                                </button>
                                                <button
                                                    onClick={() => setAiInputType('pdf')}
                                                    class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        aiInputType === 'pdf' 
                                                            ? 'bg-indigo-500 text-white' 
                                                            : 'bg-white/[0.05] text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    PDF
                                                </button>
                                            </div>
                                        </div>

                                        {/* Event Type Selection */}
                                        <div class="space-y-3">
                                            <label class="block text-sm font-medium text-white">Event Type</label>
                                            <div class="flex gap-3">
                                                <button
                                                    onClick={() => setAiEventType('personal')}
                                                    class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        aiEventType === 'personal' 
                                                            ? 'bg-indigo-500 text-white' 
                                                            : 'bg-white/[0.05] text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    Personal
                                                </button>
                                                <button
                                                    onClick={() => setAiEventType('global')}
                                                    class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        aiEventType === 'global' 
                                                            ? 'bg-indigo-500 text-white' 
                                                            : 'bg-white/[0.05] text-gray-400 hover:text-white'
                                                    }`}
                                                >
                                                    Global
                                                </button>
                                            </div>
                                            <p class="text-xs text-gray-500">Personal events are only visible to you, global events are visible to all team members</p>
                                        </div>

                                        {/* Context Input */}
                                        <div class="space-y-2">
                                            <label class="block text-sm font-medium text-white">Context (Optional)</label>
                                            <textarea
                                                value={aiContext}
                                                onChange={(e) => setAiContext(e.target.value)}
                                                rows="2"
                                                class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none backdrop-blur-sm"
                                                placeholder="Provide additional context to help AI understand the content better..."
                                            />
                                        </div>

                                        {/* Input Content */}
                                        {aiInputType === 'text' && (
                                            <div class="space-y-2">
                                                <label class="block text-sm font-medium text-white">Text Content</label>
                                                <textarea
                                                    value={aiInputText}
                                                    onChange={(e) => setAiInputText(e.target.value)}
                                                    rows="8"
                                                    class="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none backdrop-blur-sm"
                                                    placeholder="Paste or type content containing event information (e.g., emails, documents, schedules)..."
                                                />
                                            </div>
                                        )}

                                        {(aiInputType === 'image' || aiInputType === 'pdf') && (
                                            <div class="space-y-2">
                                                <label class="block text-sm font-medium text-white">
                                                    {aiInputType === 'image' ? 'Upload Image' : 'Upload PDF'}
                                                </label>
                                                <div class="border-2 border-dashed border-white/[0.08] rounded-xl p-6 text-center">
                                                    <input
                                                        type="file"
                                                        accept={aiInputType === 'image' ? 'image/*' : '.pdf'}
                                                        onChange={handleFileChange}
                                                        class="hidden"
                                                        id="ai-file-input"
                                                    />
                                                    <label
                                                        for="ai-file-input"
                                                        class="cursor-pointer flex flex-col items-center gap-3"
                                                    >
                                                        <svg class="w-12 h-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <div>
                                                            <p class="text-white font-medium">Click to upload {aiInputType === 'image' ? 'image' : 'PDF'}</p>
                                                            <p class="text-gray-400 text-sm mt-1">
                                                                {aiInputType === 'image' ? 'PNG, JPG, JPEG up to 10MB' : 'PDF up to 10MB'}
                                                            </p>
                                                        </div>
                                                    </label>
                                                    {aiInputFile && (
                                                        <div class="mt-4 p-3 bg-white/[0.05] rounded-lg">
                                                            <p class="text-white text-sm">{aiInputFile.name}</p>
                                                            <p class="text-gray-400 text-xs">{(aiInputFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Process Button */}
                                        <button
                                            onClick={processAIInput}
                                            disabled={aiProcessing || (!aiInputText.trim() && !aiInputFile)}
                                            class="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 text-white font-medium transition-all shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed"
                                        >
                                            {aiProcessing ? (
                                                <div class="flex items-center justify-center gap-2">
                                                    <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Processing with AI...
                                                </div>
                                            ) : (
                                                <div class="flex items-center justify-center gap-2">
                                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                    Extract Events
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div class="space-y-6">
                                        {/* Extracted Events */}
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <h3 class="text-lg font-semibold text-white">Extracted Events</h3>
                                                <span class="text-sm text-gray-400">{extractedEvents.length} events found</span>
                                            </div>
                                            
                                            <div class="space-y-3 max-h-96 overflow-y-auto">
                                                {extractedEvents.map((event, index) => (
                                                    <div key={index} class="p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] space-y-3">
                                                        <div class="flex items-center justify-between">
                                                            <h4 class="font-medium text-white">{event.title}</h4>
                                                            <span class={`px-2 py-1 rounded text-xs font-semibold ${
                                                                event.category === 'Meeting' ? 'bg-blue-500/20 text-blue-400' :
                                                                event.category === 'Design' ? 'bg-indigo-500/20 text-indigo-400' :
                                                                event.category === 'Client' ? 'bg-emerald-500/20 text-emerald-400' :
                                                                event.category === 'Testing' ? 'bg-amber-500/20 text-amber-400' :
                                                                event.category === 'Review' ? 'bg-purple-500/20 text-purple-400' :
                                                                event.category === 'Training' ? 'bg-red-500/20 text-red-400' :
                                                                'bg-gray-500/20 text-gray-400'
                                                            }`}>
                                                                {event.category}
                                                            </span>
                                                        </div>
                                                        {event.description && (
                                                            <p class="text-gray-300 text-sm">{event.description}</p>
                                                        )}
                                                        <div class="flex items-center gap-4 text-sm text-gray-400">
                                                            <span>Start: {event.start}</span>
                                                            <span>End: {event.end}</span>
                                                            {event.location && <span>Location: {event.location}</span>}
                                                            <span class={`px-2 py-1 rounded text-xs ${
                                                                event.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                                                event.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                                                'bg-emerald-500/20 text-emerald-400'
                                                            }`}>
                                                                {event.priority} priority
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div class="flex gap-3">
                                            <button
                                                onClick={() => setShowExtractedEvents(false)}
                                                class="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white transition-colors font-medium backdrop-blur-sm"
                                            >
                                                Back to Input
                                            </button>
                                            <button
                                                onClick={createEventsFromAI}
                                                disabled={aiProcessing}
                                                class="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 text-white transition-all font-medium shadow-lg hover:shadow-indigo-500/25"
                                            >
                                                {aiProcessing ? (
                                                    <div class="flex items-center justify-center gap-2">
                                                        <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Creating Events...
                                                    </div>
                                                ) : (
                                                    `Create ${extractedEvents.length} Events`
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {!showExtractedEvents && (
                                <div class="p-6 border-t border-white/[0.08] flex-shrink-0 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
                                    <div class="flex gap-3">
                                        <button
                                            onClick={closeAIEventModal}
                                            class="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white transition-colors font-medium backdrop-blur-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={processAIInput}
                                            disabled={aiProcessing || (!aiInputText.trim() && !aiInputFile)}
                                            class="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 text-white transition-all font-medium shadow-lg hover:shadow-emerald-500/25"
                                        >
                                            {aiProcessing ? (
                                                <div class="flex items-center justify-center gap-2">
                                                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Processing...
                                                </div>
                                            ) : (
                                                'Extract Events'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar; 