
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '@/contexts/LanguageContext';

const AgentNetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    const width = 600;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Create a group for the entire visualization
    const g = svg.append("g");
    
    // Define agents
    const agents = [
      {
        id: 'central',
        name: language === 'en' ? 'Central Repository' : 'מאגר מרכזי',
        description: language === 'en' 
          ? 'Stores and synchronizes all data between agents' 
          : 'מאחסן ומסנכרן את כל הנתונים בין הסוכנים',
        x: centerX,
        y: centerY,
        color: "#ff8000",
        radius: 50
      },
      {
        id: 'monitoring',
        name: language === 'en' ? 'Monitoring Agent' : 'סוכן ניטור',
        description: language === 'en' 
          ? 'Real-time monitoring of vital signs, medication intake, activities' 
          : 'ניטור בזמן אמת של סימנים חיוניים, נטילת תרופות, פעילויות',
        x: centerX,
        y: centerY - 120,
        color: "#00afaf",
        radius: 35
      },
      {
        id: 'cognitive',
        name: language === 'en' ? 'Cognitive Agent' : 'סוכן קוגניטיבי',
        description: language === 'en' 
          ? 'Tracks cognitive changes and personalizes mental exercises' 
          : 'עוקב אחר שינויים קוגניטיביים ומתאים אישית תרגילים מנטליים',
        x: centerX + 120,
        y: centerY - 70,
        color: "#008c8c",
        radius: 35
      },
      {
        id: 'emotional',
        name: language === 'en' ? 'Emotional Agent' : 'סוכן רגשי',
        description: language === 'en' 
          ? 'Monitors mood and emotional state, suggests interventions' 
          : 'מנטר מצב רוח ומצב רגשי, מציע התערבויות',
        x: centerX + 120,
        y: centerY + 70,
        color: "#006969",
        radius: 35
      },
      {
        id: 'coordination',
        name: language === 'en' ? 'Coordination Agent' : 'סוכן תיאום',
        description: language === 'en' 
          ? 'Schedules appointments and coordinates between caregivers' 
          : 'מתזמן פגישות ומתאם בין מטפלים',
        x: centerX,
        y: centerY + 120,
        color: "#33bfbf",
        radius: 35
      },
      {
        id: 'safety',
        name: language === 'en' ? 'Safety Agent' : 'סוכן בטיחות',
        description: language === 'en' 
          ? 'Detects risks and issues alerts for falls, wandering, etc.' 
          : 'מזהה סיכונים ומנפיק התראות לנפילות, שיטוט, וכו\'',
        x: centerX - 120,
        y: centerY + 70,
        color: "#66dbe1",
        radius: 35
      },
      {
        id: 'medical',
        name: language === 'en' ? 'Medical Agent' : 'סוכן רפואי',
        description: language === 'en' 
          ? 'Tracks health conditions and medication management' 
          : 'עוקב אחר מצבים רפואיים וניהול תרופות',
        x: centerX - 120,
        y: centerY - 70,
        color: "#99dfdf",
        radius: 35
      }
    ];
    
    // Define links between agents
    const links = agents.filter(a => a.id !== 'central').map(agent => ({
      source: 'central',
      target: agent.id,
    }));
    
    // Create links
    g.selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "connection-line")
      .attr("x1", d => {
        const source = agents.find(a => a.id === d.source);
        return source ? source.x : 0;
      })
      .attr("y1", d => {
        const source = agents.find(a => a.id === d.source);
        return source ? source.y : 0;
      })
      .attr("x2", d => {
        const target = agents.find(a => a.id === d.target);
        return target ? target.x : 0;
      })
      .attr("y2", d => {
        const target = agents.find(a => a.id === d.target);
        return target ? target.y : 0;
      })
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("opacity", 0.6)
      .attr("stroke-dasharray", function() {
        return this.getTotalLength();
      })
      .attr("stroke-dashoffset", function() {
        return this.getTotalLength();
      });
    
    // Create animated data flow
    g.selectAll(".data-flow")
      .data(links)
      .enter()
      .append("circle")
      .attr("class", "data-flow")
      .attr("r", 4)
      .attr("fill", "#ff8000")
      .style("opacity", 0)
      .each(function(d) {
        const source = agents.find(a => a.id === d.source);
        const target = agents.find(a => a.id === d.target);
        if (source && target) {
          d3.select(this)
            .attr("cx", source.x)
            .attr("cy", source.y)
            .transition()
            .delay(Math.random() * 2000)
            .duration(1500)
            .attr("cx", target.x)
            .attr("cy", target.y)
            .style("opacity", 0.8)
            .on("end", function repeat() {
              d3.select(this)
                .attr("cx", source.x)
                .attr("cy", source.y)
                .style("opacity", 0.8)
                .transition()
                .delay(Math.random() * 500)
                .duration(1500)
                .attr("cx", target.x)
                .attr("cy", target.y)
                .on("end", repeat);
            });
        }
      });
    
    // Create nodes for each agent
    const nodes = g.selectAll(".agent-node")
      .data(agents)
      .enter()
      .append("g")
      .attr("class", "agent-node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("opacity", 0.8);
        tooltip
          .style("opacity", 1)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`)
          .html(`
            <strong>${d.name}</strong><br/>
            <span>${d.description}</span>
          `);
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 1);
        tooltip.style("opacity", 0);
      });
    
    // Add pulsing effect to the central node
    nodes.filter(d => d.id === 'central')
      .append("circle")
      .attr("class", "pulse-circle")
      .attr("r", d => d.radius * 1.3)
      .attr("fill", d => d.color)
      .attr("opacity", 0.3)
      .attr("stroke", "#000")
      .attr("stroke-width", 1);
    
    // Add circles for each agent with transparent fill and black stroke
    nodes.append("circle")
      .attr("r", d => d.radius)
      .attr("fill", "transparent")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("opacity", 0.8);
    
    // Add labels
    nodes.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#313131")
      .attr("font-size", d => d.id === 'central' ? "14px" : "12px")
      .attr("font-weight", "bold")
      .text(d => d.name)
      .each(function(d) {
        const text = d3.select(this);
        const words = d.name.split(' ');
        if (words.length > 1) {
          text.text(null);
          words.forEach((word, i) => {
            text.append("tspan")
              .attr("x", 0)
              .attr("dy", i === 0 ? "-0.2em" : "1.2em")
              .text(word);
          });
        }
      });

    // Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the line animation
            svg.selectAll(".connection-line")
              .transition()
              .duration(1500)
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
    <div className="w-full max-w-3xl mx-auto">
      <svg
        ref={svgRef}
        width="100%"
        height="500"
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid meet"
      />
      <div
        ref={tooltipRef}
        className="absolute bg-white dark:bg-gray-800 p-2 rounded shadow-lg text-sm opacity-0 pointer-events-none transition-opacity z-50 max-w-xs border border-black"
      />
    </div>
  );
};

export default AgentNetworkGraph;
