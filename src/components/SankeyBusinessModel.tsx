
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '@/contexts/LanguageContext';

const SankeyBusinessModel: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 700 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    // Create chart container
    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Define nodes
    const nodes = [
      { id: "crcl", name: "C-rcl", x: 0, y: height / 2, width: 60, height: 200, color: "#00afaf" },
      
      // Revenue streams
      { id: "b2c", name: language === 'en' ? "B2C" : "B2C", 
        desc: language === 'en' ? "Families" : "משפחות", 
        x: 150, y: 80, width: 120, height: 60, color: "#33bfbf" },
      { id: "b2b", name: language === 'en' ? "B2B" : "B2B", 
        desc: language === 'en' ? "Healthcare Institutions" : "מוסדות רפואיים", 
        x: 150, y: 160, width: 120, height: 60, color: "#33bfbf" },
      { id: "b2b2c", name: language === 'en' ? "B2B2C" : "B2B2C", 
        desc: language === 'en' ? "Service Providers" : "ספקי שירותים", 
        x: 150, y: 240, width: 120, height: 60, color: "#33bfbf" },
      { id: "b2g", name: language === 'en' ? "B2G" : "B2G", 
        desc: language === 'en' ? "Government" : "ממשלה", 
        x: 150, y: 320, width: 120, height: 60, color: "#33bfbf" },
      
      // Value propositions
      { id: "burden", name: language === 'en' ? "Less Burden" : "פחות עומס", 
        x: 350, y: 40, width: 140, height: 50, color: "#006969" },
      { id: "costs", name: language === 'en' ? "Lower Costs" : "עלויות נמוכות יותר", 
        x: 350, y: 120, width: 140, height: 50, color: "#006969" },
      { id: "safety", name: language === 'en' ? "Improved Safety" : "בטיחות משופרת", 
        x: 350, y: 200, width: 140, height: 50, color: "#006969" },
      { id: "coordination", name: language === 'en' ? "Better Coordination" : "תיאום טוב יותר", 
        x: 350, y: 280, width: 140, height: 50, color: "#006969" },
      { id: "decisions", name: language === 'en' ? "Data-Driven Decisions" : "החלטות מבוססות נתונים", 
        x: 350, y: 360, width: 140, height: 50, color: "#006969" },
      
      // Stakeholders / Beneficiaries
      { id: "families", name: language === 'en' ? "Families" : "משפחות", 
        x: 550, y: 120, width: 100, height: 80, color: "#ff8000" },
      { id: "patients", name: language === 'en' ? "Patients" : "מטופלים", 
        x: 550, y: 220, width: 100, height: 80, color: "#ff8000" },
      { id: "providers", name: language === 'en' ? "Healthcare Providers" : "ספקי שירותי בריאות", 
        x: 550, y: 320, width: 100, height: 80, color: "#ff8000" }
    ];
    
    // Define links
    const links = [
      // C-rcl to revenue streams
      { source: "crcl", target: "b2c", value: 35, color: "#66dbe1" },
      { source: "crcl", target: "b2b", value: 25, color: "#66dbe1" },
      { source: "crcl", target: "b2b2c", value: 20, color: "#66dbe1" },
      { source: "crcl", target: "b2g", value: 20, color: "#66dbe1" },
      
      // Revenue streams to value propositions
      { source: "b2c", target: "burden", value: 15, color: "#33bfbf" },
      { source: "b2c", target: "costs", value: 10, color: "#33bfbf" },
      { source: "b2c", target: "safety", value: 10, color: "#33bfbf" },
      
      { source: "b2b", target: "costs", value: 10, color: "#33bfbf" },
      { source: "b2b", target: "coordination", value: 8, color: "#33bfbf" },
      { source: "b2b", target: "decisions", value: 7, color: "#33bfbf" },
      
      { source: "b2b2c", target: "burden", value: 7, color: "#33bfbf" },
      { source: "b2b2c", target: "coordination", value: 7, color: "#33bfbf" },
      { source: "b2b2c", target: "safety", value: 6, color: "#33bfbf" },
      
      { source: "b2g", target: "costs", value: 8, color: "#33bfbf" },
      { source: "b2g", target: "decisions", value: 6, color: "#33bfbf" },
      { source: "b2g", target: "safety", value: 6, color: "#33bfbf" },
      
      // Value propositions to beneficiaries
      { source: "burden", target: "families", value: 22, color: "#008c8c" },
      { source: "costs", target: "families", value: 15, color: "#008c8c" },
      { source: "costs", target: "providers", value: 13, color: "#008c8c" },
      { source: "safety", target: "patients", value: 22, color: "#008c8c" },
      { source: "coordination", target: "families", value: 8, color: "#008c8c" },
      { source: "coordination", target: "providers", value: 7, color: "#008c8c" },
      { source: "decisions", target: "providers", value: 13, color: "#008c8c" }
    ];
    
    // Create a map for easier node lookup
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    
    // Draw links
    links.forEach((link, index) => {
      const source = nodeMap.get(link.source);
      const target = nodeMap.get(link.target);
      
      if (source && target) {
        const sourceX = source.x + source.width;
        const sourceY = source.y + source.height / 2;
        const targetX = target.x;
        const targetY = target.y + target.height / 2;
        
        // Calculate control points for curved paths
        const controlX1 = sourceX + (targetX - sourceX) * 0.4;
        const controlY1 = sourceY;
        const controlX2 = sourceX + (targetX - sourceX) * 0.6;
        const controlY2 = targetY;
        
        // Create path
        const path = chart.append("path")
          .attr("d", `M ${sourceX} ${sourceY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${targetX} ${targetY}`)
          .attr("fill", "none")
          .attr("stroke", link.color)
          .attr("stroke-width", link.value / 2)
          .attr("opacity", 0.6)
          .attr("stroke-dasharray", function() {
            return this.getTotalLength();
          })
          .attr("stroke-dashoffset", function() {
            return this.getTotalLength();
          })
          .on("mouseover", function(event) {
            d3.select(this)
              .attr("opacity", 0.8)
              .attr("stroke-width", link.value / 1.5);
            
            tooltip
              .style("opacity", 1)
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 20}px`)
              .html(`${source.name} → ${target.name}`);
          })
          .on("mouseout", function() {
            d3.select(this)
              .attr("opacity", 0.6)
              .attr("stroke-width", link.value / 2);
            
            tooltip.style("opacity", 0);
          });
          
        // Animate the path
        path.transition()
          .delay(index * 100)
          .duration(1000)
          .attr("stroke-dashoffset", 0);
        
        // Add flowing dots animation
        const dot = chart.append("circle")
          .attr("r", 3)
          .attr("fill", "#ffffff")
          .style("opacity", 0);
        
        function animateDot() {
          dot.style("opacity", 0)
            .attr("cx", sourceX)
            .attr("cy", sourceY)
            .transition()
            .delay(index * 100 + Math.random() * 1000)
            .duration(1500)
            .style("opacity", 0.9)
            .attrTween("cx", function() {
              return function(t: number): string {
                // Parametric equation for cubic Bezier curve
                const x = Math.pow(1-t, 3) * sourceX + 
                          3 * Math.pow(1-t, 2) * t * controlX1 + 
                          3 * (1-t) * Math.pow(t, 2) * controlX2 + 
                          Math.pow(t, 3) * targetX;
                return x.toString();
              };
            })
            .attrTween("cy", function() {
              return function(t: number): string {
                // Parametric equation for cubic Bezier curve
                const y = Math.pow(1-t, 3) * sourceY + 
                          3 * Math.pow(1-t, 2) * t * controlY1 + 
                          3 * (1-t) * Math.pow(t, 2) * controlY2 + 
                          Math.pow(t, 3) * targetY;
                return y.toString();
              };
            })
            .on("end", animateDot);
        }
        
        // Start the animation after a delay
        setTimeout(animateDot, 1000 + index * 100);
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      const g = chart.append("g")
        .attr("transform", `translate(${node.x}, ${node.y})`)
        .attr("class", "node")
        .on("mouseover", function(event) {
          d3.select(this).attr("opacity", 0.8);
          
          let tooltipContent = `<strong>${node.name}</strong>`;
          if (node.desc) {
            tooltipContent += `<br/><span>${node.desc}</span>`;
          }
          
          tooltip
            .style("opacity", 1)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .html(tooltipContent);
        })
        .on("mouseout", function() {
          d3.select(this).attr("opacity", 1);
          tooltip.style("opacity", 0);
        });
      
      // Create rectangular node
      g.append("rect")
        .attr("width", node.width)
        .attr("height", node.height)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", node.color)
        .attr("opacity", 0.8);
      
      // Add text
      g.append("text")
        .attr("x", node.width / 2)
        .attr("y", node.height / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "white")
        .attr("font-weight", "bold")
        .text(node.name)
        .style("font-size", "14px");
      
      // Add description
      if (node.desc) {
        g.append("text")
          .attr("x", node.width / 2)
          .attr("y", node.height / 2 + 15)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .attr("fill", "white")
          .text(node.desc)
          .style("font-size", "10px");
      }
    });

    // Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
        height="500"
        viewBox="0 0 700 500"
        preserveAspectRatio="xMidYMid meet"
      />
      <div
        ref={tooltipRef}
        className="absolute bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm opacity-0 pointer-events-none transition-opacity z-50 max-w-xs"
      />
    </div>
  );
};

export default SankeyBusinessModel;
