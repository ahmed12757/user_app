import React, { useEffect, useState } from 'react';
import { IoDownloadOutline } from 'react-icons/io5';

const PWAInstallButton = ({ showSplash }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // التحقق من حالة التثبيت الحالية
        const checkStandalone = () => {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
            console.log('📱 PWA Status: isStandalone =', isStandalone);
            setIsInstalled(isStandalone);
        };

        checkStandalone();

        const handleBeforeInstallPrompt = (e) => {
            console.log('✅ PWA: beforeinstallprompt event captured!');
            // منع المتصفح من إظهار النافذة التلقائية
            e.preventDefault();
            // حفظ الحدث
            setDeferredPrompt(e);
            
            // لا تظهر الزر إذا كان التطبيق مثبتاً بالفعل
            if (!window.matchMedia('(display-mode: standalone)').matches) {
                console.log('✨ PWA: Button is now eligible to be visible');
                setIsVisible(true);
            }
        };

        const handleAppInstalled = () => {
            console.log('🎉 PWA: Application was installed successfully');
            setIsInstalled(true);
            setIsVisible(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        console.log('🛠 PWA: Listeners attached. Waiting for event...');

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            console.error('❌ PWA: No deferred prompt available');
            return;
        }

        console.log('🚀 PWA: Showing install prompt...');
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log(`👤 PWA: User choice result: ${outcome}`);

        if (outcome === 'accepted') {
            setIsVisible(false);
        }
        setDeferredPrompt(null);
    };

    // الشروط النهائية للظهور: (ليس مثبتاً) وَ (الحدث تم التقاطه) وَ (شاشة التحميل انتهت)
    if (isInstalled || !isVisible || showSplash) {
        return null;
    }

    return (
        <button
            onClick={handleInstallClick}
            className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all active:scale-95 animate-bounce md:animate-none group"
            style={{ pointerEvents: 'auto' }}
        >
            <div className="bg-white/20 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                <IoDownloadOutline size={22} />
            </div>
            <div className="flex flex-col items-start leading-none text-right">
                <span className="font-black text-sm">تثبيت التطبيق</span>
                <span className="text-[10px] opacity-80 font-medium mt-0.5">نسخة الجوال</span>
            </div>
        </button>
    );
};

export default PWAInstallButton;
