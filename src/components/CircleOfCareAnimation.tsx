
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircleOfCareAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    // Create groups for separate broken and connected circles
    const brokenGroup = svg.append("g").attr("class", "broken-circles");
    const connectedGroup = svg.append("g").attr("class", "connected-circles").style("opacity", 0);
    
    // Define circles
    const circleData = [
      { name: "Family", color: "transparent", angle: 0 },
      { name: "Caregivers", color: "transparent", angle: 90 },
      { name: "Doctors", color: "transparent", angle: 180 },
      { name: "Patient", color: "transparent", angle: 270 }
    ];
    
    // Draw broken circles
    const outerRadius = 150;
    
    circleData.forEach(d => {
      const angleRad = (d.angle * Math.PI) / 180;
      const x = centerX + Math.cos(angleRad) * outerRadius * 0.4;
      const y = centerY + Math.sin(angleRad) * outerRadius * 0.4;
      
      // Add circles with transparent fill and black stroke
      brokenGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 40)
        .attr("fill", "transparent")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("opacity", 0.2)
        .transition()
        .duration(1000)
        .attr("opacity", 1);
      
      // Add text
      brokenGroup.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#313131")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text(d.name);
    });
    
    // Draw connected circles with C-rcl in the center
    connectedGroup.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", 50)
      .attr("fill", "transparent")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("opacity", 1);
    
    connectedGroup.append("text")
      .attr("x", centerX)
      .attr("y", centerY)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#313131")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("C-rcl");
    
    // Draw the big outer circle
    connectedGroup.append("circle")
      .attr("cx", centerX)
      .attr("cy", centerY)
      .attr("r", outerRadius)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "1000")
      .attr("stroke-dashoffset", "1000")
      .attr("opacity", 1)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0);
    
    // Create a group for outer node circles and text
    circleData.forEach(d => {
      const angleRad = (d.angle * Math.PI) / 180;
      const nodeDistance = outerRadius; 
      const x = centerX + Math.cos(angleRad) * nodeDistance;
      const y = centerY + Math.sin(angleRad) * nodeDistance;
      
      // Create a group for each node
      const nodeGroup = connectedGroup.append("g");
      
      // Add the text first (so it's behind the circle)
      // Draw text labels on the outside of the nodes
      const textOffsetMultiplier = 1.3; // Position text slightly outside the circle
      const textX = centerX + Math.cos(angleRad) * (nodeDistance * textOffsetMultiplier);
      const textY = centerY + Math.sin(angleRad) * (nodeDistance * textOffsetMultiplier);
      
      // Adjust text anchor based on position
      let textAnchor = "middle";
      if (d.angle === 0) textAnchor = "start";      // right side
      else if (d.angle === 180) textAnchor = "end"; // left side
      
      nodeGroup.append("text")
        .attr("x", textX)
        .attr("y", textY)
        .attr("text-anchor", textAnchor)
        .attr("dominant-baseline", "middle")
        .attr("fill", "#313131")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text(d.name);
      
      // Add circles with transparent fill and black stroke
      nodeGroup.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 30)
        .attr("fill", "transparent")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("opacity", 1);
      
      // Add connecting lines
      connectedGroup.append("line")
        .attr("x1", centerX)
        .attr("y1", centerY)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("opacity", 1)
        .attr("stroke-dasharray", "100")
        .attr("stroke-dashoffset", "100")
        .transition()
        .delay(1000)
        .duration(1000)
        .attr("stroke-dashoffset", 0);
    });

    // Observer to trigger animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation
            setTimeout(() => {
              brokenGroup.transition()
                .duration(1000)
                .style("opacity", 0);
              
              connectedGroup.transition()
                .delay(700)
                .duration(1000)
                .style("opacity", 1);
            }, 1000);
            
            // Unobserve after triggering
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
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <svg
        ref={svgRef}
        width="100%"
        height="500"
        viewBox="0 0 600 500"
        preserveAspectRatio="xMidYMid meet"
        className="overflow-visible"
      />
    </div>
  );
};

export default CircleOfCareAnimation;
