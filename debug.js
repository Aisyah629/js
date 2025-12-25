console.log('%cPage Load Timing', 'color: #00bcd4; font-weight: bold; font-size: 16px; background: #000; padding: 8px; border-radius: 6px;');

    if (performance && performance.timing) {
        const t = performance.timing;
        const loadTime = t.loadEventEnd - t.navigationStart;
        const domReady = t.domContentLoadedEventEnd - t.navigationStart;
        const firstByte = t.responseStart - t.navigationStart;

        console.log(`Total Page Load Time: %c${loadTime}ms`, 'color: #ff9800; font-weight: bold;');
        console.log(`DOM Ready: %c${domReady}ms`, 'color: #2196f3;');
        console.log(`First Byte Received: %c${firstByte}ms`, 'color: #9c27b0;');

        if (loadTime > 3000) {
            console.warn('%c⚠ SLOW LOAD DETECTED (>3s)! Check network or large assets', 'color: #fff; background: #f44336; padding: 6px; border-radius: 4px; font-weight: bold;');
        } else if (loadTime > 1500) {
            console.log('%cℹ Moderate load time', 'color: #ffc107; font-weight: bold;');
        } else {
            console.log('%c✓ Fast load!', 'color: #4caf50; font-weight: bold;');
        }
    } else {
        console.log('%cPerformance API not supported', 'color: #9e9e9e;');
    }

    console.log('%cUser Authentication Status', 'color: #2196f3; font-weight: bold; font-size: 15px;');

    if (window.PanelUser && Object.keys(window.PanelUser).length > 0) {
        console.log('%c✓ USER LOGGED IN', 'color: #fff; background: #4caf50; padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;');
        console.log('Full User Data (from Laravel → JS):', window.PanelUser);
        console.log('User ID:', window.PanelUser.uuid || 'N/A');
        console.log('Username:', window.PanelUser.username || window.PanelUser.name || 'N/A');
        console.log('Email:', window.PanelUser.email || 'N/A');
        console.log(`Root Admin: %c${window.PanelUser.root_admin ? 'YES (Full Access)' : 'No'}`, window.PanelUser.root_admin ? 'color: #4caf50; font-weight: bold;' : 'color: #ff5722; font-weight: bold;');      console.log('2FA Enabled:', window.PanelUser.use_totp ? 'Yes' : 'No');
    } else {
        console.log('%c✗ USER NOT LOGGED IN (Guest)', 'color: #fff; background: #ff5722; padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 14px;');
        console.log('window.PanelUser:', window.PanelUser || 'undefined / empty');
    }

    setTimeout(() => {
        console.log('%cReact App Mount Check (after 2s)', 'color: #61dafb; background: #000; padding: 8px; border-radius: 6px; font-weight: bold;');

        const possibleRoots = ['#app', '#root', '[data-reactroot]', '.react-root'];
        let rootFound = false;

        for (const selector of possibleRoots) {
            const el = document.querySelector(selector);
            if (el) {
                console.log('%c✓ React Root Element Found:', 'color: #8bc34a; font-weight: bold;', selector);
                //console.log('Element:', el);

                if (el.hasChildNodes() || el.innerHTML.trim().length > 0) {
                    console.log('%c✓ React App Rendered (content visible)', 'color: #4caf50; font-weight: bold;');
                } else {
                    console.log('%c⚠ Root exists but empty – React might still be loading', 'color: #ff9800; font-weight: bold;');
                }
                rootFound = true;
                break;
            }
        }

        if (!rootFound) {
            console.log('%c✗ NO React Root Element Found!', 'color: #fff; background: #f44336; padding: 8px; border-radius: 6px; font-weight: bold;');
            console.log('   → Check child Blade view for <div id="app"> or similar');
        }
    }, 2000);
    if (document.getElementById('particles-js')) {
        console.log('%c✓ Particles container ready', 'color: #8bc34a;');
    } else {
        console.log('%c✗ #particles-js missing', 'color: #f44336; font-weight: bold;');
    }
    window.addEventListener('load', () => {
        console.log('%cAll assets fully loaded (JS, CSS, images)', 'color: #00ff00; font-weight: bold; font-size: 14px;');
    });
