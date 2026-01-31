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

  const barData = [
    { name: 'Mon', completed: 12, pending: 4 },
    { name: 'Tue', completed: 19, pending: 8 },
    { name: 'Wed', completed: 15, pending: 10 },
    { name: 'Thu', completed: 22, pending: 6 },
    { name: 'Fri', completed: 28, pending: 2 },
  ]; // Mock data for now

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
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
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
                   <XAxis dataKey="name" stroke={isDarkText ? '#9ca3af' : '#6b7280'} fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip 
                     cursor={{ fill: isDarkText ? '#f3f4f6' : '#ffffff10' }}
                     contentStyle={{ borderRadius: '12px', border: 'none' }}
                   />
                   <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
                   <Bar dataKey="pending" fill="#fbbf24" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
      
      {/* Pending Tasks List */}
      <h3 className={`text-xl font-medium mb-4 ${isDarkText ? 'text-black/80' : 'text-white/90'}`}>Pending Interactions</h3>
      <div className="space-y-3">
         {emails.filter(e => !e.read).slice(0, 5).map(email => (
            <div key={email.id} className={`p-4 rounded-xl border flex items-center justify-between ${isDarkText ? 'bg-white/60 backdrop-blur-md border-white/40 hover:bg-white/80' : 'bg-black/20 backdrop-blur-md border-white/10 hover:bg-white/5'} transition-colors cursor-pointer`}>
               <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkText ? 'bg-amber-100 text-amber-600' : 'bg-amber-500/20 text-amber-500'}`}>
                     <Clock className="w-5 h-5" />
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
