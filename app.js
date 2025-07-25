// Import Lucide icons
const { 
    Calendar, Clock, CheckSquare, Plus, Bell, Settings, Users, Heart, 
    Briefcase, User, Edit2, Trash2, X, Check, RotateCcw, MoreVertical, 
    Copy, Archive, UserCircle, FileText, Save 
} = lucide;

const ProductivityScheduler = () => {
  const [currentView, setCurrentView] = React.useState('unified');
  const [selectedDay, setSelectedDay] = React.useState(new Date().getDay());
  const [mainScreen, setMainScreen] = React.useState('schedule');
  const [appTitle, setAppTitle] = React.useState('Daily Scheduler');
  const [appSubtitle, setAppSubtitle] = React.useState('Plan your life, one hour at a time');
  
  const [dailyNotes, setDailyNotes] = React.useState({
    0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: ''
  });
  const [notesAutoSave, setNotesAutoSave] = React.useState(false);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  React.useEffect(() => {
    if (notesAutoSave) {
      const timer = setTimeout(() => {
        setNotesAutoSave(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notesAutoSave]);

  const updateDailyNote = (dayIndex, content) => {
    setDailyNotes(prev => ({
      ...prev,
      [dayIndex]: content
    }));
    setNotesAutoSave(true);
  };

  // Main render function
  return React.createElement('div', {
    className: 'max-w-6xl mx-auto p-4 min-h-screen',
    style: { backgroundColor: '#F3F4F6' }
  }, [
    // Header
    React.createElement('div', { 
      key: 'header', 
      className: 'mb-6 text-center' 
    }, [
      React.createElement('h1', {
        key: 'title',
        className: 'text-4xl font-bold mb-2',
        style: { color: '#1F2937' }
      }, appTitle),
      React.createElement('p', {
        key: 'subtitle',
        className: 'text-lg',
        style: { color: '#6B7280' }
      }, appSubtitle),
      React.createElement('div', {
        key: 'avatar',
        className: 'mt-4 w-16 h-16 mx-auto text-white rounded-full flex items-center justify-center shadow-lg',
        style: { backgroundColor: '#3B82F6' }
      }, React.createElement(UserCircle, { className: 'w-10 h-10' }))
    ]),

    // Main navigation
    React.createElement('div', {
      key: 'main-nav',
      className: 'flex justify-center gap-4 mb-8'
    }, [
      React.createElement('button', {
        key: 'schedule-btn',
        onClick: () => setMainScreen('schedule'),
        className: 'px-6 py-3 rounded-lg flex items-center space-x-2 transition-all font-medium',
        style: { 
          backgroundColor: mainScreen === 'schedule' ? '#3B82F6' : '#FFFFFF',
          color: mainScreen === 'schedule' ? '#FFFFFF' : '#1F2937',
          border: '2px solid #3B82F6',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }
      }, [
        React.createElement(Calendar, { key: 'cal-icon', className: 'w-5 h-5' }),
        React.createElement('span', { key: 'cal-text' }, 'Schedule')
      ]),
      React.createElement('button', {
        key: 'notes-btn',
        onClick: () => setMainScreen('notes'),
        className: 'px-6 py-3 rounded-lg flex items-center space-x-2 transition-all font-medium',
        style: { 
          backgroundColor: mainScreen === 'notes' ? '#3B82F6' : '#FFFFFF',
          color: mainScreen === 'notes' ? '#FFFFFF' : '#1F2937',
          border: '2px solid #3B82F6',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }
      }, [
        React.createElement(FileText, { key: 'notes-icon', className: 'w-5 h-5' }),
        React.createElement('span', { key: 'notes-text' }, 'Daily Notes'),
        Object.values(dailyNotes).some(note => note.trim()) && React.createElement('div', {
          key: 'notes-indicator',
          className: 'w-2 h-2 rounded-full ml-2',
          style: { backgroundColor: mainScreen === 'notes' ? '#FFFFFF' : '#3B82F6' }
        })
      ])
    ]),

    // Content area
    React.createElement('div', { key: 'content' }, [
      // Schedule screen
      mainScreen === 'schedule' && React.createElement('div', { 
        key: 'schedule-content',
        className: 'text-center'
      }, [
        React.createElement('h2', {
          key: 'schedule-title',
          className: 'text-2xl font-bold mb-6',
          style: { color: '#1F2937' }
        }, `Schedule - ${days[selectedDay]}`),
        
        // Day navigation
        React.createElement('div', {
          key: 'day-nav',
          className: 'flex justify-center flex-wrap gap-2 mb-8'
        }, days.map((day, index) =>
          React.createElement('button', {
            key: day,
            onClick: () => setSelectedDay(index),
            className: 'px-4 py-2 rounded-lg transition-all font-medium',
            style: { 
              backgroundColor: selectedDay === index ? '#3B82F6' : '#FFFFFF',
              color: selectedDay === index ? '#FFFFFF' : '#1F2937',
              border: '1px solid #D1D5DB',
              boxShadow: selectedDay === index ? '0 2px 4px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
            }
          }, day.slice(0, 3))
        )),

        // Simple schedule display
        React.createElement('div', {
          key: 'schedule-grid',
          className: 'max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden',
          style: { border: '1px solid #D1D5DB' }
        }, [
          React.createElement('div', {
            key: 'schedule-header',
            className: 'p-4 text-center',
            style: { backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DB' }
          }, React.createElement('h3', {
            className: 'font-semibold',
            style: { color: '#1F2937' }
          }, `${days[selectedDay]} Schedule`)),
          
          React.createElement('div', {
            key: 'time-slots',
            className: 'max-h-96 overflow-y-auto'
          }, hours.map(hour => {
            const now = new Date();
            const currentHour = now.getHours().toString().padStart(2, '0') + ':00';
            const isCurrentHour = hour === currentHour;

            return React.createElement('div', {
              key: hour,
              className: 'p-3 border-b flex items-center justify-between',
              style: { 
                borderColor: '#E5E7EB',
                backgroundColor: isCurrentHour ? '#DBEAFE' : '#FFFFFF'
              }
            }, [
              React.createElement('span', {
                key: 'time',
                className: `font-mono ${isCurrentHour ? 'font-bold' : ''}`,
                style: { color: isCurrentHour ? '#3B82F6' : '#6B7280' }
              }, [
                hour,
                isCurrentHour && React.createElement('span', {
                  key: 'current-label',
                  className: 'ml-2 text-xs bg-blue-100 px-2 py-1 rounded',
                  style: { color: '#3B82F6' }
                }, 'NOW')
              ]),
              React.createElement('div', {
                key: 'task-placeholder',
                className: 'text-sm italic',
                style: { color: '#9CA3AF' }
              }, 'Free time')
            ]);
          }))
        ])
      ]),

      // Notes screen
      mainScreen === 'notes' && React.createElement('div', { 
        key: 'notes-content' 
      }, [
        React.createElement('h2', {
          key: 'notes-title',
          className: 'text-2xl font-bold mb-6 text-center',
          style: { color: '#1F2937' }
        }, 'Daily Notes'),
        
        // Day selection for notes
        React.createElement('div', {
          key: 'notes-day-nav',
          className: 'flex justify-center flex-wrap gap-2 mb-6'
        }, days.map((day, index) =>
          React.createElement('button', {
            key: day,
            onClick: () => setSelectedDay(index),
            className: 'px-4 py-2 rounded-lg flex items-center space-x-2 transition-all font-medium',
            style: { 
              backgroundColor: selectedDay === index ? '#3B82F6' : '#FFFFFF',
              color: selectedDay === index ? '#FFFFFF' : '#1F2937',
              border: '1px solid #D1D5DB',
              boxShadow: selectedDay === index ? '0 2px 4px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
            }
          }, [
            React.createElement('span', { key: 'day-name' }, day.slice(0, 3)),
            dailyNotes[index] && React.createElement('div', {
              key: 'note-indicator',
              className: 'w-2 h-2 rounded-full',
              style: { backgroundColor: selectedDay === index ? '#FFFFFF' : '#3B82F6' }
            })
          ])
        )),

        // Notes editor
        React.createElement('div', {
          key: 'notes-editor',
          className: 'max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden',
          style: { border: '1px solid #D1D5DB' }
        }, [
          React.createElement('div', {
            key: 'notes-editor-header',
            className: 'p-4 flex items-center justify-between',
            style: { backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DB' }
          }, [
            React.createElement('h3', {
              key: 'notes-day-title',
              className: 'font-semibold',
              style: { color: '#1F2937' }
            }, `${days[selectedDay]} Notes`),
            notesAutoSave && React.createElement('div', {
              key: 'auto-save-indicator',
              className: 'flex items-center space-x-2 text-sm',
              style: { color: '#22C55E' }
            }, [
              React.createElement(Save, { key: 'save-icon', className: 'w-4 h-4' }),
              React.createElement('span', { key: 'save-text' }, 'Saved')
            ])
          ]),
          
          React.createElement('div', { 
            key: 'notes-editor-body', 
            className: 'p-4' 
          }, [
            React.createElement('textarea', {
              key: 'notes-textarea',
              value: dailyNotes[selectedDay] || '',
              onChange: (e) => updateDailyNote(selectedDay, e.target.value),
              placeholder: `What's on your mind for ${days[selectedDay]}?\n\nSome ideas:\n• Goals for the day\n• Important reminders\n• Reflections and thoughts\n• Things you're grateful for\n• Lessons learned\n• Tomorrow's priorities`,
              className: 'w-full h-80 resize-none border-none outline-none text-sm leading-relaxed',
              style: { 
                color: '#1F2937',
                backgroundColor: 'transparent'
              }
            })
          ]),

          React.createElement('div', {
            key: 'notes-editor-footer',
            className: 'px-4 py-3 flex items-center justify-between',
            style: { backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }
          }, [
            React.createElement('div', {
              key: 'notes-stats',
              className: 'flex items-center space-x-4 text-xs',
              style: { color: '#6B7280' }
            }, [
              React.createElement('span', { key: 'char-count' }, `${dailyNotes[selectedDay]?.length || 0} characters`),
              React.createElement('span', { key: 'separator' }, '•'),
              React.createElement('span', { key: 'line-count' }, `${dailyNotes[selectedDay]?.split('\n').length || 1} lines`)
            ]),
            
            React.createElement('div', {
              key: 'notes-actions',
              className: 'flex items-center space-x-2'
            }, [
              React.createElement('button', {
                key: 'clear-btn',
                onClick: () => updateDailyNote(selectedDay, ''),
                className: 'px-3 py-1 text-xs rounded hover:opacity-80 transition-opacity',
                style: { backgroundColor: '#6B7280', color: '#FFFFFF' }
              }, 'Clear'),
              React.createElement('button', {
                key: 'template-btn',
                onClick: () => {
                  const today = new Date().toLocaleDateString();
                  const template = `${today} - ${days[selectedDay]}\n\n📋 Today's Goals:\n• \n• \n• \n\n💭 Thoughts & Reflections:\n\n\n🙏 Grateful for:\n• \n• \n• \n\n📝 Tomorrow's Priorities:\n• \n• \n• `;
                  updateDailyNote(selectedDay, template);
                },
                className: 'px-3 py-1 text-xs text-white rounded hover:opacity-90 transition-opacity',
                style: { backgroundColor: '#3B82F6' }
              }, 'Add Template')
            ])
          ])
        ]),

        // Weekly stats
        React.createElement('div', {
          key: 'weekly-stats',
          className: 'mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto'
        }, [
          React.createElement('div', {
            key: 'days-with-notes',
            className: 'p-4 bg-white rounded-lg shadow text-center',
            style: { border: '1px solid #D1D5DB' }
          }, [
            React.createElement('div', {
              key: 'stat-number-1',
              className: 'text-2xl font-bold',
              style: { color: '#3B82F6' }
            }, Object.values(dailyNotes).filter(note => note.trim()).length),
            React.createElement('div', {
              key: 'stat-label-1',
              className: 'text-sm',
              style: { color: '#6B7280' }
            }, 'Days with notes')
          ]),
          React.createElement('div', {
            key: 'total-chars',
            className: 'p-4 bg-white rounded-lg shadow text-center',
            style: { border: '1px solid #D1D5DB' }
          }, [
            React.createElement('div', {
              key: 'stat-number-2',
              className: 'text-2xl font-bold',
              style: { color: '#10B981' }
            }, Object.values(dailyNotes).reduce((acc, note) => acc + (note?.length || 0), 0)),
            React.createElement('div', {
              key: 'stat-label-2',
              className: 'text-sm',
              style: { color: '#6B7280' }
            }, 'Total characters')
          ]),
          React.createElement('div', {
            key: 'lines-today',
            className: 'p-4 bg-white rounded-lg shadow text-center',
            style: { border: '1px solid #D1D5DB' }
          }, [
            React.createElement('div', {
              key: 'stat-number-3',
              className: 'text-2xl font-bold',
              style: { color: '#F59E0B' }
            }, dailyNotes[selectedDay]?.split('\n').length || 1),
            React.createElement('div', {
              key: 'stat-label-3',
              className: 'text-sm',
              style: { color: '#6B7280' }
            }, 'Lines today')
          ]),
          React.createElement('div', {
            key: 'week-completion',
            className: 'p-4 bg-white rounded-lg shadow text-center',
            style: { border: '1px solid #D1D5DB' }
          }, [
            React.createElement('div', {
              key: 'stat-number-4',
              className: 'text-2xl font-bold',
              style: { color: '#EC4899' }
            }, `${Math.round((Object.values(dailyNotes).filter(note => note.trim()).length / 7) * 100)}%`),
            React.createElement('div', {
              key: 'stat-label-4',
              className: 'text-sm',
              style: { color: '#6B7280' }
            }, 'Week completion')
          ])
        ])
      ])
    ])
  ]);
};

// Render the app
ReactDOM.render(React.createElement(ProductivityScheduler), document.getElementById('root'));style: { backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }
        }, React.createElement('div', {
          className: 'max-h-96 overflow-y-auto'
        }, hours.map(hour => {
          const now = new Date();
          const currentHour = now.getHours().toString().padStart(2, '0') + ':00';
          const isCurrentHour = hour === currentHour;

          return React.createElement('div', {
            key: hour,
            className: 'border-b p-2 relative group hover:bg-gray-50',
            style: { 
              borderColor: '#D1D5DB',
              backgroundColor: isCurrentHour ? '#DBEAFE' : '#FFFFFF'
            }
          }, [
            React.createElement('div', {
              className: `text-xs mb-1 ${isCurrentHour ? 'font-semibold' : ''}`,
              style: { color: isCurrentHour ? '#3B82F6' : '#6B7280' }
            }, [
              hour,
              isCurrentHour && ' - Now'
            ])
          ]);
        })))
      ]),

      // Notes screen content
      mainScreen === 'notes' && React.createElement('div', { key: 'notes-content' }, [
        React.createElement('h2', {
          key: 'notes-title',
          className: 'text-2xl font-bold mb-4',
          style: { color: '#1F2937' }
        }, 'Daily Notes'),
        
        // Day selection for notes
        React.createElement('div', {
          key: 'notes-day-nav',
          className: 'flex space-x-2 mb-4 overflow-x-auto'
        }, days.map((day, index) =>
          React.createElement('button', {
            key: day,
            onClick: () => setSelectedDay(index),
            className: 'px-4 py-2 rounded-lg whitespace-nowrap flex items-center space-x-2',
            style: { 
              backgroundColor: selectedDay === index ? '#3B82F6' : '#FFFFFF',
              color: selectedDay === index ? '#FFFFFF' : '#1F2937',
              border: '1px solid #D1D5DB'
            }
          }, [
            React.createElement('span', {}, day),
            dailyNotes[index] && React.createElement('div', {
              className: 'w-2 h-2 rounded-full',
              style: { backgroundColor: selectedDay === index ? '#FFFFFF' : '#3B82F6' }
            })
          ])
        )),

        // Notes editor
        React.createElement('div', {
          key: 'notes-editor',
          className: 'rounded-lg border shadow-lg',
          style: { backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }
        }, [
          React.createElement('div', {
            key: 'notes-header',
            className: 'p-4 border-b',
            style: { backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' }
          }, [
            React.createElement('h3', {
              className: 'font-semibold',
              style: { color: '#1F2937' }
            }, `${days[selectedDay]} Notes`)
          ]),
          
          React.createElement('div', { key: 'notes-body', className: 'p-4' }, [
            React.createElement('textarea', {
              value: dailyNotes[selectedDay] || '',
              onChange: (e) => updateDailyNote(selectedDay, e.target.value),
              placeholder: `What's on your mind for ${days[selectedDay]}?`,
              className: 'w-full h-96 resize-none border-none outline-none text-sm',
              style: { color: '#1F2937' }
            })
          ]),

          React.createElement('div', {
            key: 'notes-footer',
            className: 'px-4 py-3 border-t flex items-center justify-between',
            style: { backgroundColor: '#F9FAFB', borderColor: '#D1D5DB' }
          }, [
            React.createElement('div', {
              className: 'text-xs',
              style: { color: '#6B7280' }
            }, `${dailyNotes[selectedDay]?.length || 0} characters`),
            
            React.createElement('button', {
              onClick: () => updateDailyNote(selectedDay, ''),
              className: 'px-3 py-1 text-xs rounded hover:opacity-80',
              style: { backgroundColor: '#6B7280', color: '#FFFFFF' }
            }, 'Clear')
          ])
        ])
      ])
    ])
  ]);
};

// Render the app
ReactDOM.render(React.createElement(ProductivityScheduler), document.getElementById('root'));', color: '#FFFFFF' } // Text Secondary
    };
    const categoryColor = categories[category]?.color || 'gray';
    return colorMap[categoryColor] || colorMap.gray;
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'heart': React.createElement(Heart, { className: 'w-4 h-4' }),
      'briefcase': React.createElement(Briefcase, { className: 'w-4 h-4' }),
      'user': React.createElement(User, { className: 'w-4 h-4' }),
      'calendar': React.createElement(Calendar, { className: 'w-4 h-4' }),
      'star': React.createElement('span', { className: 'w-4 h-4 text-center' }, '⭐'),
      'home': React.createElement('span', { className: 'w-4 h-4 text-center' }, '🏠'),
      'study': React.createElement('span', { className: 'w-4 h-4 text-center' }, '📚'),
      'music': React.createElement('span', { className: 'w-4 h-4 text-center' }, '🎵'),
      'travel': React.createElement('span', { className: 'w-4 h-4 text-center' }, '✈️'),
      'hobby': React.createElement('span', { className: 'w-4 h-4 text-center' }, '🎨')
    };
    const categoryIcon = categories[category]?.icon || 'star';
    return iconMap[categoryIcon] || React.createElement('span', { className: 'w-4 h-4 text-center' }, '📋');
  };

  const getTasksForView = () => {
    if (currentView === 'unified') {
      return tasks;
    } else if (categories[currentView]) {
      return { [currentView]: tasks[currentView] || [] };
    } else {
      return tasks;
    }
  };

  const renderTimeSlot = (hour) => {
    const allTasks = getTasksForView();
    const hourTasks = [];
    
    Object.entries(allTasks).forEach(([category, categoryTasks]) => {
      if (categoryTasks) {
        categoryTasks.forEach(task => {
          if (task.time.startsWith(hour.slice(0, 2))) {
            hourTasks.push({ ...task, category });
          }
        });
      }
    });

    const isEmpty = hourTasks.length === 0;
    const isDraggedOver = dragOverSlot === hour;
    
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0') + ':00';
    const isCurrentHour = hour === currentHour;

    return React.createElement('div', {
      key: hour,
      className: `border-b min-h-16 p-2 relative group hover:opacity-95 transition-opacity duration-200 ${isDraggedOver ? 'bg-blue-100 border-blue-300' : ''} ${isCurrentHour ? 'shadow-lg' : ''}`,
      style: { 
        borderColor: '#D1D5DB',
        backgroundColor: isCurrentHour ? '#DBEAFE' : '#FFFFFF'
      },
      onClick: () => isEmpty && setShowQuickAdd(hour),
      onDragOver: (e) => handleDragOver(e, hour),
      onDragLeave: handleDragLeave,
      onDrop: (e) => handleDrop(e, hour)
    }, [
      React.createElement('div', {
        key: 'time-label',
        className: `text-xs mb-1 flex items-center space-x-2 ${isCurrentHour ? 'font-semibold' : ''}`,
        style: { color: isCurrentHour ? '#3B82F6' : '#6B7280' }
      }, [
        React.createElement('span', { key: 'hour' }, hour),
        isCurrentHour && React.createElement(React.Fragment, { key: 'current-indicators' }, [
          React.createElement('div', {
            key: 'pulse-dot',
            className: 'w-2 h-2 rounded-full animate-pulse',
            style: { backgroundColor: '#3B82F6' }
          }),
          React.createElement('span', {
            key: 'now-text',
            className: 'text-xs font-medium'
          }, 'Now')
        ])
      ]),
      
      isCurrentHour && React.createElement('div', {
        key: 'current-hour-silhouette',
        className: 'absolute top-0 right-2 opacity-20'
      }, React.createElement('div', {
        className: 'w-8 h-8 rounded-full flex items-center justify-center',
        style: { backgroundColor: '#3B82F6' }
      }, React.createElement(Clock, {
        className: 'w-4 h-4',
        style: { color: '#FFFFFF' }
      }))),
      
      isDraggedOver && draggedTask && React.createElement('div', {
        key: 'drag-indicator',
        className: 'absolute inset-0 border-2 border-dashed border-blue-400 bg-blue-50 bg-opacity-50 rounded flex items-center justify-center'
      }, React.createElement('span', {
        className: 'text-blue-600 text-sm font-medium'
      }, 'Drop here to move task')),
      
      isEmpty && !isDraggedOver && React.createElement('div', {
        key: 'quick-add-button',
        className: 'absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'
      }, React.createElement('button', {
        onClick: (e) => {
          e.stopPropagation();
          setNewTask(prev => ({ ...prev, time: hour }));
          setShowQuickAdd(hour);
        },
        className: 'text-white rounded-full p-2 shadow-lg hover:opacity-90 transition-opacity',
        style: { backgroundColor: '#3B82F6' }
      }, React.createElement(Plus, { className: 'w-4 h-4' }))),

      ...hourTasks.map(task => 
        React.createElement('div', {
          key: task.id,
          draggable: task.category !== 'calendar',
          onDragStart: (e) => handleDragStart(e, task, task.category),
          className: `mb-1 p-2 rounded-lg border flex items-center justify-between group/task hover:shadow-md transition-all duration-200 ${task.category !== 'calendar' ? 'cursor-move hover:scale-105' : ''} ${draggedTask && draggedTask.id === task.id ? 'opacity-50 scale-95' : ''}`,
          style: getCategoryStyle(task.category)
        }, [
          React.createElement('div', {
            key: 'task-content',
            className: 'flex items-center space-x-2 flex-1'
          }, [
            getCategoryIcon(task.category),
            React.createElement('div', {
              key: 'task-text',
              className: 'flex-1'
            }, [
              React.createElement('span', {
                key: 'task-title',
                className: task.completed ? 'line-through' : ''
              }, task.task),
              task.description && React.createElement('div', {
                key: 'task-description',
                className: 'text-xs opacity-75 mt-1',
                style: { color: 'inherit' }
              }, task.description)
            ]),
            task.duration && React.createElement('span', {
              key: 'task-duration',
              className: 'text-xs',
              style: { color: 'inherit' }
            }, `(${task.duration})`),
            task.category !== 'calendar' && React.createElement('div', {
              key: 'drag-handle',
              className: 'opacity-0 group-hover/task:opacity-100 text-xs',
              style: { color: '#999999' }
            }, '⋮⋮')
          ]),
          React.createElement('div', {
            key: 'task-actions',
            className: 'flex items-center space-x-2'
          }, [
            task.alert && React.createElement(Bell, { key: 'alert-icon', className: 'w-3 h-3' }),
            task.category !== 'calendar' && React.createElement(React.Fragment, { key: 'task-controls' }, [
              React.createElement('input', {
                key: 'checkbox',
                type: 'checkbox',
                checked: task.completed,
                onChange: () => toggleTask(task.category, task.id),
                className: 'rounded'
              }),
              React.createElement('div', {
                key: 'menu-container',
                className: 'relative'
              }, [
                React.createElement('button', {
                  key: 'menu-button',
                  onClick: (e) => {
                    e.stopPropagation();
                    setShowTaskMenu(showTaskMenu === task.id ? null : task.id);
                  },
                  className: 'opacity-60 group-hover/task:opacity-100 p-1 rounded transition-all',
                  style: { backgroundColor: 'rgba(255,255,255,0.7)' }
                }, React.createElement(MoreVertical, { className: 'w-4 h-4' })),
                
                showTaskMenu === task.id && React.createElement('div', {
                  key: 'task-menu',
                  className: 'absolute right-0 top-full mt-1 border rounded-lg shadow-lg z-50 min-w-32',
                  style: { backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }
                }, [
                  React.createElement('button', {
                    key: 'edit-button',
                    onClick: () => {
                      setShowEditTask(task);
                      setShowTaskMenu(null);
                    },
                    className: 'w-full px-3 py-2 text-left text-sm hover:opacity-80 flex items-center space-x-2 rounded-t-lg',
                    style: { color: '#1F2937', backgroundColor: 'transparent' },
                    onMouseEnter: (e) => e.target.style.backgroundColor = '#F3F4F6',
                    onMouseLeave: (e) => e.target.style.backgroundColor = 'transparent'
                  }, [
                    React.createElement(Edit2, { key: 'edit-icon', className: 'w-3 h-3' }),
                    React.createElement('span', { key: 'edit-text' }, 'Edit')
                  ]),
                  React.createElement('button', {
                    key: 'duplicate-button',
                    onClick: () => {
                      const newTask = { ...task, id: Date.now(), task: `${task.task} (Copy)` };
                      setTasks(prev => ({
                        ...prev,
                        [task.category]: [...(prev[task.category] || []), newTask]
                      }));
                      setShowTaskMenu(null);
                    },
                    className: 'w-full px-3 py-2 text-left text-sm hover:opacity-80 flex items-center space-x-2',
                    style: { color: '#1F2937', backgroundColor: 'transparent' },
                    onMouseEnter: (e) => e.target.style.backgroundColor = '#F3F4F6',
                    onMouseLeave: (e) => e.target.style.backgroundColor = 'transparent'
                  }, [
                    React.createElement(Copy, { key: 'copy-icon', className: 'w-3 h-3' }),
                    React.createElement('span', { key: 'copy-text' }, 'Duplicate')
                  ]),
                  React.createElement('hr', {
                    key: 'divider',
                    style: { borderColor: '#D1D5DB' }
                  }),
                  React.createElement('button', {
                    key: 'delete-button',
                    onClick: () => {
                      confirmDeleteTask(task.category, task.id, task.task);
                      setShowTaskMenu(null);
                    },
                    className: 'w-full px-3 py-2 text-left text-sm hover:opacity-80 flex items-center space-x-2 rounded-b-lg',
                    style: { color: '#EF4444', backgroundColor: 'transparent' },
                    onMouseEnter: (e) => e.target.style.backgroundColor = '#FEF2F2',
                    onMouseLeave: (e) => e.target.style.backgroundColor = 'transparent'
                  }, [
                    React.createElement(Trash2, { key: 'trash-icon', className: 'w-3 h-3' }),
                    React.createElement('span', { key: 'delete-text' }, 'Delete')
                  ])
                ])
              ])
            ])
          ])
        ])
      )
    ]);
  };

  const renderNotesScreen = () => {
    return React.createElement('div', { className: 'space-y-6' }, [
      React.createElement('div', {
        key: 'notes-header',
        className: 'flex items-center justify-between'
      }, [
        React.createElement('div', { key: 'header-text' }, [
          React.createElement('h2', {
            key: 'notes-title',
            className: 'text-2xl font-bold',
            style: { color: '#1F2937' }
          }, 'Daily Notes'),
          React.createElement('p', {
            key: 'notes-subtitle',
            className: 'text-sm',
            style: { color: '#6B7280' }
          }, 'Capture your thoughts, ideas, and reflections for each day')
        ]),
        notesAutoSave && React.createElement('div', {
          key: 'auto-save-indicator',
          className: 'flex items-center space-x-2 text-sm',
          style: { color: '#3B82F6' }
        }, [
          React.createElement(Save, { key: 'save-icon', className: 'w-4 h-4' }),
          React.createElement('span', { key: 'save-text' }, 'Auto-saved')
        ])
      ]),

      React.createElement('div', {
        key: 'day-selection',
        className: 'flex space-x-2 overflow-x-auto'
      }, days.map((day, index) =>
        React.createElement('button', {
          key: day,
          onClick: () => setSelectedDay(index),
          className: 'px-4 py-2 rounded-lg whitespace
