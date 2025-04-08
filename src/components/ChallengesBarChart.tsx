
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '@/contexts/LanguageContext';

const ChallengesBarChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const challenges = [
      { 
        id: 'emotional',
        value: 78, 
        label: language === 'en' ? 'Emotional Burden' : 'עומס רגשי',
        description: language === 'en' 
          ? 'Caregivers experience high levels of stress, anxiety, and depression'
          : 'מטפלים חווים רמות גבוהות של לחץ, חרדה ודיכאון'
      },
      { 
        id: 'financial',
        value: 65, 
        label: language === 'en' ? 'Financial Cost' : 'עלות כלכלית',
        description: language === 'en' 
          ? 'Yearly cost per patient: $30,000-$100,000 including care, medication, and lost income'
          : 'עלות שנתית למטופל: $30,000-$100,000 כולל טיפול, תרופות והפסד הכנסה'
      },
      { 
        id: 'coordination',
        value: 85, 
        label: language === 'en' ? 'Care Coordination' : 'תיאום טיפול',
        description: language === 'en' 
          ? 'Poor information flow between caregivers and medical professionals'
          : 'זרימת מידע לקויה בין מטפלים ואנשי מקצוע רפואיים'
      },
      { 
        id: 'safety',
        value: 72, 
        label: language === 'en' ? 'Patient Safety' : 'בטיחות המטופל',
        description: language === 'en' 
          ? '60% of dementia patients experience falls, medication errors, or wandering incidents'
          : '60% מחולי דמנציה חווים נפילות, טעויות בתרופות, או אירועי שיטוט'
      },
      { 
        id: 'memory',
        value: 90, 
        label: language === 'en' ? 'Memory Loss' : 'אובדן זיכרון',
        description: language === 'en' 
          ? 'Progressive cognitive decline affects daily functioning and independence'
          : 'הידרדרות קוגניטיבית משפיעה על תפקוד יומיומי ועצמאות'
      }
    ];
    
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create chart container
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X scale
    const x = d3.scaleBand()
      .domain(challenges.map(d => d.id))
      .range([0, width])
      .padding(0.3);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([height, 0]);
    
    // Add X axis
    chart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat((d) => {
        const challenge = challenges.find(c => c.id === d);
        return challenge ? challenge.label : '';
      }))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "12px");
    
    // Add Y axis
    chart.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text(language === 'en' ? "Impact Score (%)" : "ציון השפעה (%)");
    
    // Add bars with animation
    chart.selectAll(".bar")
      .data(challenges)
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.id) as number)
        .attr("width", x.bandwidth())
        .attr("y", height)
        .attr("height", 0)
        .attr("fill", "transparent")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .on("mouseover", function(event, d) {
          d3.select(this).attr("opacity", 0.8);
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .html(`
              <strong>${d.label}</strong><br/>
              <span>${d.description}</span><br/>
              <span>${language === 'en' ? 'Impact' : 'השפעה'}: ${d.value}%</span>
            `);
        })
        .on("mouseout", function() {
          d3.select(this).attr("opacity", 1);
          tooltip.style("opacity", 0);
        })
        .transition()
        .duration(800)
        .delay((_, i) => i * 200)
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value));
    
    // Add value labels
    chart.selectAll(".label")
      .data(challenges)
      .enter()
      .append("text")
        .attr("class", "label")
        .attr("x", d => (x(d.id) as number) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) - 5)
        .attr("text-anchor", "middle")
        .attr("opacity", 0)
        .text(d => `${d.value}%`)
        .transition()
        .duration(800)
        .delay((_, i) => i * 200 + 400)
        .attr("opacity", 1);

    // Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Bars are already animated on render
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => {
      if (svgRef.current) observer.unobserve(svgRef.current);
    };
  }, [language]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <svg
        ref={svgRef}
        width="100%"
        height="400"
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid meet"
      />
      <div
        ref={tooltipRef}
        className="absolute bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm opacity-0 pointer-events-none transition-opacity z-50 max-w-xs border border-black"
      />
    </div>
  );
};

export default ChallengesBarChart;
