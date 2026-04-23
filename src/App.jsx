import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EditModal from './components/EditModal';

function App() {
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchPortfolio = async () => {
        try {
            const res = await axios.get('/api/portfolio');
            if (res.data.success) {
                setPortfolioData(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                height: '100vh', background: '#0a192f', color: '#64ffda', gap: '16px'
            }}>
                <div style={{
                    width: '40px', height: '40px', border: '3px solid #64ffda',
                    borderTopColor: 'transparent', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#8892b0' }}>Loading portfolio…</p>
            </div>
        );
    }

    return (
        <div className="app">
            <Header onEditClick={() => setIsEditModalOpen(true)} />
            <main>
                <Hero    data={portfolioData} />
                <About   data={portfolioData} />
                <Skills  data={portfolioData} />
                <Contact data={portfolioData} />
            </main>
            <Footer data={portfolioData} />

            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                data={portfolioData}
                onSaveSuccess={setPortfolioData}
            />
        </div>
    );
}

export default App;
