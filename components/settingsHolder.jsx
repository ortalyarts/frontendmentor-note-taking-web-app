import { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";

import { setPreferencesCookie } from '@/lib/cookie.js'

import IconArrowRight from "@/components/UI/iconArrowRight.jsx";
import IconColorTheme from '@/components/UI/iconColorTheme.jsx';
import IconDarkTheme from '@/components/UI/IconDarkTheme.jsx';
import IconNoTheme from '@/components/UI/IconNoTheme.jsx';
import IconFontTheme from '@/components/UI/iconFontTheme.jsx';
import IconPassword from '@/components/UI/IconPassword.jsx';
import IconLogout from '@/components/UI/IconLogout.jsx';
import IconFontMonospace from '@/components/UI/iconFontMonospace.jsx';
import IconFontSansSerif from '@/components/UI/iconFontSansSerif.jsx';
import IconFontSerif from '@/components/UI/iconFontSerif.jsx';
import BtnSelectorContent from '@/components/UI/btnSelectorContent';
import BtnBackToSettings from '@/components/btnBackToSettings';

export default function SettingsHolder({isDesktop}) {

    const [activeSetting, setActiveSetting] = useState('colorTheme');
    const [colorTheme, setColorTheme] = useState('system');
    const [fontTheme, setFontTheme] = useState('sansSerif');

    // Simplified function to only set the color theme via cookies
    // useEffect(() => {
    //     // Apply to <html> immediately on selection
    //     const root = document.documentElement;
    //     root.classList.remove('light', 'dark');
      
    //     if (colorTheme === 'system') {
    //       const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //       root.classList.add(isDark ? 'dark' : 'light');
    //     } else {
    //       root.classList.add(colorTheme);
    //     }
    //   }, [colorTheme]);

    // useEffect(() => {
    //     const match = document.cookie.match(/theme=(light|dark|system)/);
    //     const savedTheme = match?.[1] || 'system';
    //     setColorTheme(savedTheme);
    // }, []);

    // 
    // General function to set both color and font themes via cookies
    useEffect(() => {
        // Apply color theme immediately
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        if (colorTheme === 'system') {
          const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          root.classList.add(isDark ? 'dark' : 'light');
        } else {
          root.classList.add(colorTheme);
        }
      }, [colorTheme]);
    
      useEffect(() => {
        // Apply font theme immediately
        const root = document.documentElement;
        root.classList.remove('sansSerif', 'serif', 'monospace');
        root.classList.add(fontTheme);
      }, [fontTheme]);

      useEffect(() => {
        if(!isDesktop) {
            setActiveSetting('settingsTitles');
        }
      }, []);
    
      // 
      useEffect(() => {
        const themeMatch = document.cookie.match(/theme=(light|dark|system)/);
        const fontMatch = document.cookie.match(/font=(sansSerif|serif|monospace)/);
        if (themeMatch) setColorTheme(themeMatch[1]);
        if (fontMatch) setFontTheme(fontMatch[1]);
      }, []);

      // set cookies (so the user choice stays after refresh)
      const applyChanges = () => {
        setPreferencesCookie({ theme: colorTheme, font: fontTheme });
      };
    

    return (
    <div className={`tags-note-buttons ${isDesktop ? '' : 'settings-mobile'}`}>
        {(!isDesktop & activeSetting === 'settingsTitles') || isDesktop ? (
        <aside className="sidebar">
            {(!isDesktop & activeSetting === 'settingsTitles') ? (<h1 className="text-1">Settings</h1>) : null}
            <ul className='settings-nav'>
                <li>
                    <button type='button' className={`btn-transparent  ${activeSetting === 'colorTheme' ? 'active' : ''}`}
                        onClick={() => {setActiveSetting('colorTheme')}}
                    >  
                        <IconColorTheme />
                        <span>Color Theme</span>
                        <span className="icon-arrow"><IconArrowRight /></span>
                    </button>
                </li>
                <li>
                    <button type='button' className={`btn-transparent  ${activeSetting === 'fontTheme' ? 'active' : ''}`}
                        onClick={() => {setActiveSetting('fontTheme')}}
                    >  
                        <IconFontTheme />
                        <span>Font Theme</span>
                        <span className="icon-arrow"><IconArrowRight /></span>
                    </button>
                </li>
                {/* <li>
                    <button type='button' className={`btn-transparent  ${activeSetting === 'password' ? 'active' : ''}`}
                        onClick={() => {setActiveSetting('password')}}
                    >  
                        <IconPassword />
                        <span>Change Password</span>
                        <span className="icon-arrow"><IconArrowRight /></span>
                    </button>
                </li> */}
                <div className='horizontal-line'></div>
                <li>
                    <button type='button' className='btn-transparent'
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >  
                        <IconLogout />
                        <span>Logout</span>
                        <span className="icon-arrow"><IconArrowRight /></span>
                    </button>
                </li>
            </ul>
        </aside>
        )
        :
        (null)
        }
        
        <section className='settings'>
            {activeSetting === 'colorTheme' && (
                <div className='settings-content'>
                    {!isDesktop && (<BtnBackToSettings setActiveSetting={setActiveSetting} />)}
                    <h2 className='text-3'>Color Theme</h2>
                    <p className='text-6'>Choose your color theme:</p>
                    <button type='button' className={`btn-transparent btn-selector ${colorTheme === 'light' ? 'active' : ''}`}
                        onClick={() => {setColorTheme('light')}}>
                        <BtnSelectorContent title='Light Mode' text='Pick a clean and classic light theme' >
                            <IconColorTheme />
                        </BtnSelectorContent>
                    </button>
                    <button type='button' className={`btn-transparent btn-selector ${colorTheme === 'dark' ? 'active' : ''}`}
                        onClick={() => {setColorTheme('dark')}}>
                        <BtnSelectorContent title='Dark Mode' text='Select a sleek and modern dark theme' >
                            <IconDarkTheme />
                        </BtnSelectorContent>
                    </button>
                     <button type='button' className={`btn-transparent btn-selector ${colorTheme === 'system' ? 'active' : ''}`}
                        onClick={() => {setColorTheme('system')}}>
                        <BtnSelectorContent title='System' text='Adapts to your device’s theme' >
                            <IconNoTheme />
                        </BtnSelectorContent>
                    </button>
                    
                    {/* <button type="button" className='btn-main' onClick={() => {setThemeCookie(colorTheme)}}>
                        Apply Changes
                    </button> */}
                    <button type="button" className='btn-main' onClick={applyChanges}>
                        Apply Changes
                    </button>
                </div>
            )}

            {activeSetting === 'fontTheme' && (
                <div className='settings-content'>
                    {!isDesktop && (<BtnBackToSettings setActiveSetting={setActiveSetting} />)}
                    <h2 className='text-3'>Font Theme</h2>
                    <p className='text-6'>Choose your font theme:</p>
                    <button type='button' className={`btn-transparent btn-selector ${fontTheme === 'sansSerif' ? 'active' : ''}`}
                        onClick={() => {setFontTheme('sansSerif')}}>
                        <BtnSelectorContent title='Sans-serif' text='Clean and modern, easy to read.' >
                            <IconFontSansSerif />
                        </BtnSelectorContent>
                    </button>
                    <button type='button' className={`btn-transparent btn-selector ${fontTheme === 'serif' ? 'active' : ''}`}
                        onClick={() => {setFontTheme('serif')}}>
                        <BtnSelectorContent title='Serif' text='Classic and elegant for a timeless feel.' >
                            <IconFontSerif />
                        </BtnSelectorContent>
                    </button>
                     <button type='button' className={`btn-transparent btn-selector ${fontTheme === 'monospace' ? 'active' : ''}`}
                        onClick={() => {setFontTheme('monospace')}}>
                        <BtnSelectorContent title='Monospace' text='Code-like, great for a technical vibe.' >
                            <IconFontMonospace />
                        </BtnSelectorContent>
                    </button>
                    
                    <button type="button" className='btn-main' onClick={applyChanges}>
                        Apply Changes
                    </button>
                </div>
            )}
        </section>
    </div>
    )
}