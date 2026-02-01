import { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, Tooltip, Legend 
} from 'recharts';
import { Email, CalendarEvent } from '@/app/types';
import { Clock } from 'lucide-react';

interface ReportsDashboardProps {
  emails: Email[];
  events: CalendarEvent[];
  onBack: () => void;
  isDarkText: boolean;
}

export function ReportsDashboard({ emails, events, onBack, isDarkText }: ReportsDashboardProps) {
  // Stats Calculation
  const stats = useMemo(() => {
    const completedEmails = emails.filter(e => e.read).length;
    const pendingEmails = emails.filter(e => !e.read).length;
    const completedEvents = events.filter(e => e.end < new Date()).length;
    const upcomingEvents = events.filter(e => e.start > new Date()).length;

    return {
      completed: completedEmails + completedEvents,
      pending: pendingEmails + upcomingEvents,
      total: emails.length + events.length
    };
  }, [emails, events]);

  const pieData = [
    { name: 'Completed', value: stats.completed, color: '#10b981' }, // emerald-500
    { name: 'Pending', value: stats.pending, color: '#fbbf24' },   // amber-400
  ];

  const sacrificeData = useMemo(() => {
    const sacrifices: Record<string, number> = {};
    
    events.forEach(e => {
        if (e.shadowedContext) {
            const durationHrs = (e.end.getTime() - e.start.getTime()) / (1000 * 60 * 60);
            sacrifices[e.shadowedContext] = (sacrifices[e.shadowedContext] || 0) + durationHrs;
        }
    });

    return Object.entries(sacrifices).map(([name, hours]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        hours: Math.round(hours * 10) / 10
    }));
  }, [events]);

  const barData = [
    { name: 'Mon', completed: 12, pending: 4 },
    { name: 'Tue', completed: 19, pending: 8 },
    { name: 'Wed', completed: 15, pending: 10 },
    { name: 'Thu', completed: 22, pending: 6 },
    { name: 'Fri', completed: 28, pending: 2 },
  ]; // Mock data for now

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-xl border backdrop-blur-xl shadow-2xl ${isDarkText ? 'bg-white/90 border-white/50 text-black' : 'bg-black/80 border-white/20 text-white'}`}>
          {label && <p className="font-medium text-xs mb-2 opacity-70 uppercase tracking-wider">{label}</p>}
          <div className="space-y-1">
             {payload.map((entry: any, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span style={{ color: entry.color }}>{entry.name}:</span>
                    <span>{entry.value}</span>
                </div>
             ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col h-full overflow-y-auto custom-scrollbar p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
           <h2 className={`font-['Instrument_Serif'] text-4xl mb-2 ${isDarkText ? 'text-black/80' : 'text-white/90'}`}>Productivity Reports</h2>
           <p className={`${isDarkText ? 'text-black/50' : 'text-white/50'}`}>Track your focus and efficiency.</p>
        </div>
        <button 
           onClick={onBack}
           className={`px-4 py-2 ${isDarkText ? 'bg-black/5 hover:bg-black/10 text-black/70' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-full text-sm font-medium transition-colors`}
        >
           Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
         {/* Pie Chart Card */}
         <div className={`p-6 rounded-3xl border ${isDarkText ? 'bg-white/60 backdrop-blur-xl border-white/40 shadow-xl' : 'bg-black/20 backdrop-blur-xl border-white/10'}`}>
            <h3 className={`text-lg font-medium mb-6 ${isDarkText ? 'text-black/70' : 'text-white/80'}`}>Task Status</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="pieColorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
                      </linearGradient>
                      <linearGradient id="pieColorPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#d97706" stopOpacity={1}/>
                      </linearGradient>
                    </defs>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.name === 'Completed' ? 'url(#pieColorCompleted)' : 'url(#pieColorPending)'} 
                          stroke="none" 
                          cornerRadius={6} 
                        />
                      ))}
                    </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Bar Chart Card */}
         <div className={`p-6 rounded-3xl border ${isDarkText ? 'bg-white/60 backdrop-blur-xl border-white/40 shadow-xl' : 'bg-black/20 backdrop-blur-xl border-white/10'}`}>
            <h3 className={`text-lg font-medium mb-6 ${isDarkText ? 'text-black/70' : 'text-white/80'}`}>Weekly Activity</h3>
            <div className="h-64 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={barData}>
                   <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.6}/>
                      </linearGradient>
                      <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity={0.6}/>
                      </linearGradient>
                   </defs>
                   <XAxis dataKey="name" stroke={isDarkText ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip content={<CustomTooltip />} cursor={{ fill: isDarkText ? '#f3f4f6' : '#ffffff10' }} />
                   <Bar dataKey="completed" fill="url(#colorCompleted)" radius={[6, 6, 6, 6]} />
                   <Bar dataKey="pending" fill="url(#colorPending)" radius={[6, 6, 6, 6]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Sacrifice Chart Card */}
      <div className={`mb-8 p-6 rounded-3xl border ${isDarkText ? 'bg-white/60 backdrop-blur-xl border-white/40 shadow-xl' : 'bg-black/20 backdrop-blur-xl border-white/10'}`}>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                <Clock className="w-5 h-5 text-red-400" />
            </div>
            <div>
                <h3 className={`text-lg font-medium ${isDarkText ? 'text-black/70' : 'text-white/80'}`}>Focus Sacrifice Analysis</h3>
                <p className="text-xs opacity-50">Hours lost from each context due to interruptions</p>
            </div>
        </div>
        
        <div className="h-48 w-full">
            {sacrificeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sacrificeData} layout="vertical">
                    <defs>
                        <linearGradient id="colorSacrifice" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#f87171" stopOpacity={0.5}/>
                        </linearGradient>
                    </defs>
                    <XAxis type="number" stroke={isDarkText ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} unit="hr" />
                    <Tooltip 
                        content={<CustomTooltip />} 
                        cursor={{ fill: isDarkText ? '#f3f4f6' : '#ffffff10' }}
                    />
                    <Bar 
                        dataKey="name" 
                        hide 
                    />
                    <Bar 
                        dataKey="hours" 
                        fill="url(#colorSacrifice)" 
                        radius={[0, 6, 6, 0]} 
                        barSize={32}
                        label={{ position: 'insideLeft', fill: 'white', fontSize: 12 }}
                    />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-40">
                    <p>No sacrifices recorded this week.</p>
                    <p className="text-xs">Your schedule is perfectly aligned! ✨</p>
                </div>
            )}
        </div>
      </div>
      
      {/* Pending Tasks List */}
      <h3 className={`text-xl font-medium mb-4 ${isDarkText ? 'text-black/80' : 'text-white/90'}`}>Pending Interactions</h3>
      <div className="space-y-3">
         {emails.filter(e => !e.read).slice(0, 5).map(email => (
            <div key={email.id} className={`p-4 rounded-xl border flex items-center justify-between ${isDarkText ? 'bg-white/60 backdrop-blur-md border-white/40 hover:bg-white/80' : 'bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/5'} transition-colors cursor-pointer`}>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                     <img 
                        src={email.from.avatar} 
                        alt={email.from.name}
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div>
                     <p className={`font-medium ${isDarkText ? 'text-black/80' : 'text-white/90'}`}>{email.subject}</p>
                     <p className={`text-sm ${isDarkText ? 'text-black/40' : 'text-white/50'}`}>From: {email.from.name}</p>
                  </div>
               </div>
               <span className={`text-xs px-3 py-1 rounded-full ${isDarkText ? 'bg-black/5 text-black/50' : 'bg-white/10 text-white/50'}`}>High Priority</span>
            </div>
         ))}
      </div>
    </motion.div>
  );
}
