import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '@/contexts/LanguageContext';

const MarketGrowthChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    const margin = { top: 40, right: 150, bottom: 60, left: 60 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create chart container
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Data
    const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
    
    const dementiaCare = [
      { year: 2024, value: 18.03 },
      { year: 2025, value: 22 },
      { year: 2026, value: 27 },
      { year: 2027, value: 33 },
      { year: 2028, value: 38 },
      { year: 2029, value: 45 },
      { year: 2030, value: 50 }
    ];
    
    const dementiaTech = [
      { year: 2024, value: 23 },
      { year: 2025, value: 27 },
      { year: 2026, value: 32 },
      { year: 2027, value: 37 },
      { year: 2028, value: 43 },
      { year: 2029, value: 50 },
      { year: 2030, value: 58 }
    ];
    
    // X scale
    const x = d3.scaleLinear()
      .domain([2024, 2030])
      .range([0, width]);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, 60])
      .range([height, 0]);
    
    // Line generators
    const careLine = d3.line<{year: number, value: number}>()
      .x(d => x(d.year))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
    
    const techLine = d3.line<{year: number, value: number}>()
      .x(d => x(d.year))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);
    
    // Add X axis
    chart.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => d.toString()).ticks(7))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .text(language === 'en' ? "Year" : "שנה");
    
    // Add Y axis
    chart.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .text(language === 'en' ? "Market Size (Billion $)" : "גודל שוק (מיליארד $)");
    
    // Add area between curves
    chart.append("path")
      .datum(years.map(year => {
        const careData = dementiaCare.find(d => d.year === year);
        const techData = dementiaTech.find(d => d.year === year);
        return {
          year,
          careValue: careData ? careData.value : 0,
          techValue: techData ? techData.value : 0
        };
      }))
      .attr("fill", "url(#area-gradient)")
      .attr("opacity", 0.2)
      .attr("d", d3.area<{year: number, careValue: number, techValue: number}>()
        .x(d => x(d.year))
        .y0(d => y(d.careValue))
        .y1(d => y(d.techValue))
        .curve(d3.curveMonotoneX)
      )
      .attr("stroke", "none")
      .attr("clip-path", "url(#clip-path)");
    
    // Add the dementia care market line
    const carePath = chart.append("path")
      .datum(dementiaCare)
      .attr("fill", "none")
      .attr("stroke", "#008c8c")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", function() {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function() {
        return this.getTotalLength();
      })
      .attr("d", careLine);
    
    // Add the dementia tech market line
    const techPath = chart.append("path")
      .datum(dementiaTech)
      .attr("fill", "none")
      .attr("stroke", "#ff8000")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", function() {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function() {
        return this.getTotalLength();
      })
      .attr("d", techLine);
    
    // Create a gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "area-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff8000");
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#008c8c");
    
    // Add data points with tooltips
    dementiaCare.forEach(d => {
      chart.append("circle")
        .attr("cx", x(d.year))
        .attr("cy", y(d.value))
        .attr("r", 5)
        .attr("fill", "#008c8c")
        .attr("opacity", 0)
        .on("mouseover", function(event) {
          d3.select(this).attr("r", 7);
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .html(`
              <strong>${language === 'en' ? 'Dementia Care Market' : 'שוק הטיפול בדמנציה'}</strong><br/>
              <span>${language === 'en' ? 'Year' : 'שנה'}: ${d.year}</span><br/>
              <span>${language === 'en' ? 'Value' : 'ערך'}: $${d.value}B</span>
            `);
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 5);
          tooltip.style("opacity", 0);
        })
        .transition()
        .delay(1000)
        .duration(500)
        .attr("opacity", 1);
    });
    
    dementiaTech.forEach(d => {
      chart.append("circle")
        .attr("cx", x(d.year))
        .attr("cy", y(d.value))
        .attr("r", 5)
        .attr("fill", "#ff8000")
        .attr("opacity", 0)
        .on("mouseover", function(event) {
          d3.select(this).attr("r", 7);
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .html(`
              <strong>${language === 'en' ? 'Dementia Tech Market' : 'שוק הטכנולוגיה לדמנציה'}</strong><br/>
              <span>${language === 'en' ? 'Year' : 'שנה'}: ${d.year}</span><br/>
              <span>${language === 'en' ? 'Value' : 'ערך'}: $${d.value}B</span>
            `);
        })
        .on("mouseout", function() {
          d3.select(this).attr("r", 5);
          tooltip.style("opacity", 0);
        })
        .transition()
        .delay(1000)
        .duration(500)
        .attr("opacity", 1);
    });
    
    // Reposition the legend to the right side of the chart to avoid overlap
    const legend = chart.append("g")
      .attr("transform", `translate(${width + 20}, 20)`);
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#008c8c");
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 12)
      .attr("text-anchor", "start")
      .text(language === 'en' ? "Dementia Care Market" : "שוק הטיפול בדמנציה");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 25)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "#ff8000");
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 37)
      .attr("text-anchor", "start")
      .text(language === 'en' ? "Dementia Tech Market" : "שוק הטכנולוגיה לדמנציה");
    
    legend.append("rect")
      .attr("x", 0)
      .attr("y", 50)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "url(#area-gradient)")
      .attr("opacity", 0.2);
    
    legend.append("text")
      .attr("x", 25)
      .attr("y", 62)
      .attr("text-anchor", "start")
      .text(language === 'en' ? "Market Opportunity" : "הזדמנות שוק");

    // Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the line animation
            carePath.transition()
              .duration(2000)
              .attr("stroke-dashoffset", 0);
            
            techPath.transition()
              .duration(2000)
              .attr("stroke-dashoffset", 0);
            
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
    <div className="w-full max-w-4xl mx-auto overflow-x-auto">
      <svg
        ref={svgRef}
        width="100%"
        height="400"
        viewBox="0 0 700 400"
        preserveAspectRatio="xMidYMid meet"
      />
      <div
        ref={tooltipRef}
        className="absolute bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm opacity-0 pointer-events-none transition-opacity z-50 max-w-xs"
      />
    </div>
  );
};

export default MarketGrowthChart;
