import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, 
  Orbit, 
  Coins, 
  Command, 
  Settings, 
  Cpu, 
  Activity,
  ArrowUpRight,
  TrendingUp,
  Telescope,
  ShieldCheck,
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- Global Theme ---
const theme = {
  accent: '#6366f1',
  success: '#10b981',
  danger: '#ef4444',
  textDim: '#64748b'
};

const SectionHeader = ({ title, desc }: { title: string, desc: string }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 className="outfit" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>{title}</h2>
    <p style={{ color: theme.textDim, fontSize: '0.95rem' }}>{desc}</p>
  </div>
);

const PremiumCard = ({ children, title, icon: Icon, span = 1 }: any) => (
  <motion.div 
    className="premium-card" 
    style={{ gridColumn: `span ${span}` }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
  >
    <div className="card-title">
      <Icon size={16} />
      <span>{title}</span>
    </div>
    {children}
  </motion.div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [nasaData, setNasaData] = useState<any>(null);
  const [quoteData, setQuoteData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [c, n, q] = await Promise.all([
          axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'),
          axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'),
          axios.get('https://api.quotable.io/random')
        ]);
        setCryptoData(c.data);
        setNasaData(n.data);
        setQuoteData(q.data);
      } catch (err) {
        console.error("Master Sync Failed", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-shell">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', padding: '0 8px' }}>
          <div style={{ width: '40px', height: '40px', background: theme.accent, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Command color="#fff" size={24} />
          </div>
          <div>
            <h1 className="outfit" style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>ZTH ULTRA</h1>
            <p style={{ fontSize: '0.7rem', color: theme.textDim, textTransform: 'uppercase', letterSpacing: '1px' }}>V2.4 Enterprise</p>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} /> <span>Command Center</span>
          </div>
          <div className={`nav-item ${activeTab === 'space' ? 'active' : ''}`} onClick={() => setActiveTab('space')}>
            <Orbit size={20} /> <span>Space Intel</span>
          </div>
          <div className={`nav-item ${activeTab === 'assets' ? 'active' : ''}`} onClick={() => setActiveTab('assets')}>
            <Coins size={20} /> <span>Asset Watch</span>
          </div>
          <div className={`nav-item ${activeTab === 'dev' ? 'active' : ''}`} onClick={() => setActiveTab('dev')}>
            <Cpu size={20} /> <span>Dev Protocol</span>
          </div>
        </nav>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
          <div className="nav-item">
            <Settings size={20} /> <span>Configurations</span>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="canvas custom-scrollbar">
        {activeTab === 'dashboard' && (
          <div className="grid-layout">
            {/* Welcome Header */}
            <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <SectionHeader title="Operations Overview" desc="Real-time synchronized data from global intelligence nodes." />
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="premium-card" style={{ padding: '12px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={16} color={theme.success} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>SYSTEM: OPTIMAL</span>
                </div>
              </div>
            </div>

            {/* Crypto Intelligence */}
            <PremiumCard title="Market Intelligence" icon={TrendingUp} span={2}>
              <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
                {cryptoData ? (
                  <>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span className="badge badge-primary">BTC/USD</span>
                        <ArrowUpRight size={14} color={theme.textDim} />
                      </div>
                      <div className="stat-value outfit">${cryptoData.bitcoin.usd.toLocaleString()}</div>
                      <p style={{ color: cryptoData.bitcoin.usd_24h_change > 0 ? '#4ade80' : '#f87171', fontSize: '0.85rem', marginTop: '4px' }}>
                        {cryptoData.bitcoin.usd_24h_change > 0 ? '+' : ''}{cryptoData.bitcoin.usd_24h_change.toFixed(2)}% (24h)
                      </p>
                    </div>
                    <div style={{ width: '1px', height: '80px', background: 'var(--border-subtle)' }}></div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span className="badge badge-primary">ETH/USD</span>
                        <ArrowUpRight size={14} color={theme.textDim} />
                      </div>
                      <div className="stat-value outfit">${cryptoData.ethereum.usd.toLocaleString()}</div>
                      <p style={{ color: cryptoData.ethereum.usd_24h_change > 0 ? '#4ade80' : '#f87171', fontSize: '0.85rem', marginTop: '4px' }}>
                        {cryptoData.ethereum.usd_24h_change > 0 ? '+' : ''}{cryptoData.ethereum.usd_24h_change.toFixed(2)}% (24h)
                      </p>
                    </div>
                  </>
                ) : <div className="dim-text">Synchronizing with global exchanges...</div>}
              </div>
            </PremiumCard>

            {/* System Info */}
            <PremiumCard title="Core Engine" icon={Cpu} span={1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', color: theme.textDim, marginBottom: '4px' }}>Processing Power</p>
                  <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1.5 }} style={{ height: '100%', background: theme.accent }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem' }}>Active Nodes</span>
                  <span className="accent-text" style={{ fontWeight: 700 }}>1,248</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.85rem' }}>Uptime</span>
                  <span style={{ color: theme.success, fontWeight: 700 }}>99.999%</span>
                </div>
              </div>
            </PremiumCard>

            {/* NASA Intel - Full Height */}
            <PremiumCard title="Cosmic Feed" icon={Telescope} span={1}>
              {nasaData ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <img src={nasaData.url} className="nasa-hero" alt="NASA" />
                  <h4 className="outfit" style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{nasaData.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: theme.textDim, lineBreak: 'anywhere', height: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {nasaData.explanation}
                  </p>
                  <button className="btn-action" style={{ width: '100%', marginTop: 'auto' }} onClick={() => window.open(nasaData.url, '_blank')}>Open Mission Log</button>
                </div>
              ) : <div className="dim-text">Establishing satellite connection...</div>}
            </PremiumCard>

            {/* Daily Advice / Quote */}
            <PremiumCard title="Strategic Insight" icon={ShieldCheck} span={2}>
              {quoteData ? (
                <div style={{ padding: '20px 0' }}>
                  <Quote size={40} color="rgba(79, 70, 229, 0.2)" style={{ position: 'absolute', top: '20px', left: '20px' }} />
                  <p className="outfit" style={{ fontSize: '1.4rem', fontWeight: 500, lineHeight: 1.4, position: 'relative', zIndex: 1 }}>
                    "{quoteData.content}"
                  </p>
                  <p style={{ marginTop: '20px', color: theme.accent, fontWeight: 700, textAlign: 'right' }}>
                    — PROTOCAL {quoteData.author.toUpperCase()}
                  </p>
                </div>
              ) : <div className="dim-text">Generating daily heuristic...</div>}
            </PremiumCard>

            {/* Quick Actions */}
            <div style={{ gridColumn: 'span 3', marginTop: '12px' }}>
              <SectionHeader title="Development Protocols" desc="Access advanced tooling and deployment routines." />
              <div style={{ display: 'flex', gap: '16px' }}>
                {['System Scan', 'Node Reboot', 'Deploy V3', 'Security Audit'].map(action => (
                  <button 
                    key={action} 
                    className="btn-action" 
                    style={{ flex: 1, padding: '16px', borderRadius: '16px', fontSize: '0.9rem', fontWeight: 600 }}
                    onClick={() => {
                      confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#6366f1', '#10b981']
                      });
                      alert(`${action} protocol initiated successfully.`);
                    }}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <SectionHeader title={`${activeTab.toUpperCase()} PROTOCOL`} desc="Sub-system interface under initialization." />
            <div className="premium-card" style={{ padding: '40px', maxWidth: '500px' }}>
              <Activity size={48} color={theme.accent} style={{ marginBottom: '20px' }} />
              <p>The <strong>{activeTab}</strong> module is currently in read-only mode during V2 synchronization. Operational controls will be established in the next patch.</p>
              <button className="btn-action" onClick={() => setActiveTab('dashboard')}>Return to Command Center</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
