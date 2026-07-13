import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsMobile } from '@/hooks/use-mobile';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
    children,
    scrollContainerRef = null,
    enableBlur = true,
    baseOpacity = 0.1,
    baseRotation = 3,
    blurStrength = 4,
    containerClassName = '',
    textClassName = '',
    rotationEnd = 'bottom bottom',
    wordAnimationEnd = 'bottom bottom'
}) => {
    const containerRef = useRef(null);
    const isMobile = useIsMobile();
    // Completely disable blur for max scroll performance (GSAP filter:blur is a known layout killer)
    const effectiveBlur = false; 

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="word" key={index}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

        const triggers: ScrollTrigger[] = [];

        // Optimize rotation animation with will-change and reduced scrub for performance
        const rotTween = gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation, willChange: 'transform' },
            {
                ease: 'none',
                rotate: 0,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom',
                    end: rotationEnd,
                    scrub: 0.5,
                    invalidateOnRefresh: true
                }
            }
        );
        if (rotTween.scrollTrigger) triggers.push(rotTween.scrollTrigger);

        const wordElements = el.querySelectorAll('.word');

        // Optimize opacity animation
        const opacityTween = gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
                ease: 'none',
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    scroller,
                    start: 'top bottom-=20%',
                    end: wordAnimationEnd,
                    scrub: 0.5,
                    invalidateOnRefresh: true
                },
                onComplete: () => {
                    wordElements.forEach(word => {
                        (word as HTMLElement).style.willChange = 'auto';
                    });
                }
            }
        );
        if (opacityTween.scrollTrigger) triggers.push(opacityTween.scrollTrigger);

        // Optimize blur animation - this is the most expensive operation
        if (effectiveBlur) {
            const blurTween = gsap.fromTo(
                wordElements,
                { filter: `blur(${blurStrength}px)`, willChange: 'filter' },
                {
                    ease: 'none',
                    filter: 'blur(0px)',
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        scroller,
                        start: 'top bottom-=20%',
                        end: wordAnimationEnd,
                        scrub: 0.5,
                        invalidateOnRefresh: true
                    }
                }
            );
            if (blurTween.scrollTrigger) triggers.push(blurTween.scrollTrigger);
        }

        return () => {
            // Kill ScrollTriggers specific to this component instance on unmount
            triggers.forEach(trigger => trigger.kill());
        };
    }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, effectiveBlur]);

    return (
        <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
            <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
        </div>
    );
};

export default ScrollReveal;
