
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '@/contexts/LanguageContext';

const ROITimelineChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create chart container
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Generate data
    const months = Array.from({ length: 25 }, (_, i) => i);
    
    // Calculate ROI and savings
    const monthlyCost = 500; // Monthly subscription cost
    const monthlySavings = 3000; // Estimated monthly savings
    
    const costs = months.map(month => ({
      month,
      value: monthlyCost * (month + 1),
      type: 'cost'
    }));
    
    const savings = months.map(month => ({
      month,
      value: monthlySavings * (month + 1),
      type: 'savings'
    }));
    
    // Calculate break-even point
    const breakEvenMonth = Math.ceil(monthlyCost / (monthlySavings - monthlyCost));
    
    // X scale - time in months
    const x = d3.scaleLinear()
      .domain([0, 24])
      .range([0, width]);
    
    // Y scale - money
    const y = d3.scaleLinear()
      .domain([0, monthlySavings * 24])
      .range([height, 0]);
    
    // Line generators
    const costLine = d3.line<{month: number, value: number, type: string}>()
      .x(d => x(d.month))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
    
    const savingsLine = d3.line<{month: number, value: number, type: string}>()
      .x(d => x(d.month))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
    
    // Add X axis
    chart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(12).tickFormat(d => `${d}m`))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .text(language === 'en' ? "Months" : "חודשים");
    
    // Add Y axis
    chart.append("g")
      .call(d3.axisLeft(y).tickFormat(d => `$${(d as number) / 1000}k`))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .text(language === 'en' ? "Amount ($)" : "סכום ($)");
    
    // Highlight break-even area - Making this transparent now (was light green)
    chart.append("rect")
      .attr("x", x(breakEvenMonth))
      .attr("y", 0)
      .attr("width", width - x(breakEvenMonth))
      .attr("height", height)
      .attr("fill", "transparent") // Changed from #00afaf with opacity to transparent
      .attr("stroke", "#006969")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "3,3");
    
    // Add break-even line
    chart.append("line")
      .attr("x1", x(breakEvenMonth))
      .attr("y1", 0)
      .attr("x2", x(breakEvenMonth))
      .attr("y2", height)
      .attr("stroke", "#ff8000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("opacity", 0);
    
    // Add break-even label
    chart.append("text")
      .attr("x", x(breakEvenMonth))
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("transform", `translate(0,-10)`)
      .attr("fill", "#ff8000")
      .attr("font-weight", "bold")
      .text(language === 'en' ? `Break-even: ${breakEvenMonth} months` : `נקודת איזון: ${breakEvenMonth} חודשים`)
      .attr("opacity", 0);
    
    // Add the cost line
    const costPath = chart.append("path")
      .datum(costs)
      .attr("fill", "none")
      .attr("stroke", "#ff3333")
      .attr("stroke-width", 2)
      .attr("d", costLine)
      .attr("stroke-dasharray", function() {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function() {
        return this.getTotalLength();
      });
    
    // Add the savings line
    const savingsPath = chart.append("path")
      .datum(savings)
      .attr("fill", "none")
      .attr("stroke", "#00cc66")
      .attr("stroke-width", 2)
      .attr("d", savingsLine)
      .attr("stroke-dasharray", function() {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function() {
        return this.getTotalLength();
      });
    
    // Add a legend
    const legend = chart.append("g")
      .attr("transform", `translate(${width - 20}, 10)`);
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#00cc66");
    
    legend.append("text")
      .attr("x", -5)
      .attr("y", 10)
      .attr("text-anchor", "end")
      .text(language === 'en' ? "Savings" : "חיסכון");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#ff3333");
    
    legend.append("text")
      .attr("x", -5)
      .attr("y", 30)
      .attr("text-anchor", "end")
      .text(language === 'en' ? "Investment" : "השקעה");
    
    // Add "ROI positive" label
    chart.append("text")
      .attr("x", x(18))
      .attr("y", y(monthlySavings * 18 / 2))
      .attr("text-anchor", "middle")
      .attr("fill", "#006969")
      .attr("font-weight", "bold")
      .attr("opacity", 0)
      .text(language === 'en' ? "ROI Positive Zone" : "אזור ROI חיובי");

    // Interactive points
    [3, 6, 12, 18, 24].forEach(month => {
      const costValue = costs.find(d => d.month === month)?.value || 0;
      const savingsValue = savings.find(d => d.month === month)?.value || 0;
      const roi = ((savingsValue - costValue) / costValue * 100).toFixed(0);
      
      chart.append("circle")
        .attr("cx", x(month))
        .attr("cy", y(savingsValue))
        .attr("r", 5)
        .attr("fill", "#00cc66")
        .attr("opacity", 0)
        .on("mouseover", function(event) {
          d3.select(this).attr("r", 7);
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .html(`
              <strong>${language === 'en' ? 'Month' : 'חודש'}: ${month}</strong><br/>
              <span>${language === 'en' ? 'Savings' : 'חיסכון'}: $${savingsValue.toLocaleString()}</span><br/>
              <span>${language === 'en' ? 'Cost' : 'עלות'}: $${costValue.toLocaleString()}</span><br/>
              <span>${language === 'en' ? 'ROI' : 'תשואה להשקעה'}: ${roi}%</span>
            `);
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 5);
          tooltip.style("opacity", 0);
        })
        .transition()
        .delay(2000)
        .duration(500)
        .attr("opacity", 1);
    });

    // Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the line animation
            costPath.transition()
              .duration(1500)
              .attr("stroke-dashoffset", 0);
            
            savingsPath.transition()
              .duration(1500)
              .attr("stroke-dashoffset", 0);
            
            // Animate other elements
            chart.selectAll("line")
              .transition()
              .delay(1500)
              .duration(500)
              .attr("opacity", 1);
            
            chart.selectAll("text[opacity='0']")
              .transition()
              .delay(1500)
              .duration(500)
              .attr("opacity", 1);
            
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
        className="absolute bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm opacity-0 pointer-events-none transition-opacity z-50 max-w-xs"
      />
    </div>
  );
};

export default ROITimelineChart;
