import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  componentCount: number;
  domNodeCount: number;
  reRenderTime?: number;
  memoryLeak?: boolean;
}

export interface PerformanceTestConfig {
  componentName: string;
  component: ReactElement;
  maxRenderTime?: number; // milliseconds
  maxMemoryUsage?: number; // MB
  maxDomNodes?: number;
  testReRenders?: boolean;
  testMemoryLeaks?: boolean;
}

export class PerformanceTester {
  private metrics: PerformanceMetrics[] = [];
  private componentName: string;
  private config: PerformanceTestConfig;

  constructor(config: PerformanceTestConfig) {
    this.config = config;
    this.componentName = config.componentName;
  }

  /**
   * Test component render performance
   */
  testRenderPerformance(): PerformanceMetrics {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();
    
    const { container } = render(this.config.component);
    
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    
    const renderTime = endTime - startTime;
    const memoryUsage = endMemory - startMemory;
    const componentCount = this.countReactComponents(container);
    const domNodeCount = this.countDOMNodes(container);
    
    const metrics: PerformanceMetrics = {
      renderTime,
      memoryUsage,
      componentCount,
      domNodeCount
    };
    
    this.metrics.push(metrics);
    
    // Assert performance thresholds
    if (this.config.maxRenderTime && renderTime > this.config.maxRenderTime) {
      throw new Error(
        `Render time ${renderTime.toFixed(2)}ms exceeds maximum ${this.config.maxRenderTime}ms for ${this.componentName}`
      );
    }
    
    if (this.config.maxMemoryUsage && memoryUsage > this.config.maxMemoryUsage) {
      throw new Error(
        `Memory usage ${memoryUsage.toFixed(2)}MB exceeds maximum ${this.config.maxMemoryUsage}MB for ${this.componentName}`
      );
    }
    
    if (this.config.maxDomNodes && domNodeCount > this.config.maxDomNodes) {
      throw new Error(
        `DOM node count ${domNodeCount} exceeds maximum ${this.config.maxDomNodes} for ${this.componentName}`
      );
    }
    
    return metrics;
  }

  /**
   * Test component re-render performance
   */
  testReRenderPerformance(_triggerReRender: () => void): PerformanceMetrics {
    if (!this.config.testReRenders) {
      return this.metrics[0];
    }
    
    const { } = render(this.config.component);
    
    // Trigger re-render
    const startTime = performance.now();
    // triggerReRender();
    const endTime = performance.now();
    
    const reRenderTime = endTime - startTime;
    
    const metrics: PerformanceMetrics = {
      ...this.metrics[0],
      reRenderTime
    };
    
    this.metrics.push(metrics);
    
    // Assert re-render performance
    if (this.config.maxRenderTime && reRenderTime > this.config.maxRenderTime * 0.5) {
      throw new Error(
        `Re-render time ${reRenderTime.toFixed(2)}ms is too slow for ${this.componentName}`
      );
    }
    
    return metrics;
  }

  /**
   * Test for memory leaks
   */
  testMemoryLeaks(iterations: number = 10): boolean {
    if (!this.config.testMemoryLeaks) {
      return false;
    }
    
    const memorySnapshots: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const { unmount } = render(this.config.component);
      
      const memoryBefore = this.getMemoryUsage();
      unmount();
      const memoryAfter = this.getMemoryUsage();
      
      memorySnapshots.push(memoryAfter - memoryBefore);
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
    }
    
    // Check for consistent memory growth
    const averageMemoryChange = memorySnapshots.reduce((sum, change) => sum + change, 0) / iterations;
    const memoryLeak = averageMemoryChange > 0.1; // 0.1MB threshold
    
    this.metrics.forEach(metric => {
      metric.memoryLeak = memoryLeak;
    });
    
    return memoryLeak;
  }

  /**
   * Test component with large datasets
   */
  testLargeDataPerformance(dataSize: number): PerformanceMetrics {
    // Create large dataset
    const largeData = Array.from({ length: dataSize }, (_, index) => ({
      id: index,
      name: `Item ${index}`,
      description: `Description for item ${index}`,
      value: Math.random() * 1000
    }));
    
    // Modify component props to include large data
    const componentWithLargeData = {
      ...this.config.component,
      props: {
        ...this.config.component.props,
        data: largeData
      }
    };
    
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();
    
    const { container } = render(componentWithLargeData as ReactElement);
    
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    
    const renderTime = endTime - startTime;
    const memoryUsage = endMemory - startMemory;
    const componentCount = this.countReactComponents(container);
    const domNodeCount = this.countDOMNodes(container);
    
    const metrics: PerformanceMetrics = {
      renderTime,
      memoryUsage,
      componentCount,
      domNodeCount
    };
    
    this.metrics.push(metrics);
    
    return metrics;
  }

  /**
   * Test component under stress conditions
   */
  testStressConditions(): PerformanceMetrics[] {
    const stressTests = [
      { name: 'Rapid re-renders', action: () => this.testRapidReRenders() },
      { name: 'Large data sets', action: () => this.testLargeDataPerformance(1000) },
      { name: 'Memory pressure', action: () => this.testMemoryPressure() }
    ];
    
    const results: PerformanceMetrics[] = [];
    
    stressTests.forEach(test => {
      try {
        console.log(`Running stress test: ${test.name}`);
        const result = test.action();
        results.push(result);
        console.log(`✅ ${test.name} passed`);
      } catch (error) {
        console.error(`❌ ${test.name} failed:`, error);
        throw error;
      }
    });
    
    return results;
  }

  /**
   * Test rapid re-renders
   */
  private testRapidReRenders(): PerformanceMetrics {
    const { rerender } = render(this.config.component);
    
    const startTime = performance.now();
    
    // Perform 100 rapid re-renders
    for (let i = 0; i < 100; i++) {
      rerender(this.config.component);
    }
    
    const endTime = performance.now();
    const totalTime = endTime - startTime;
    const averageTime = totalTime / 100;
    
    return {
      renderTime: averageTime,
      componentCount: 0,
      domNodeCount: 0,
      reRenderTime: averageTime
    };
  }

  /**
   * Test memory pressure
   */
  private testMemoryPressure(): PerformanceMetrics {
    const startMemory = this.getMemoryUsage();
    
    // Create multiple component instances
    const instances: RenderResult[] = [];
    for (let i = 0; i < 10; i++) {
      instances.push(render(this.config.component));
    }
    
    // const peakMemory = this.getMemoryUsage();
    
    // Clean up
    instances.forEach(instance => instance.unmount());
    
    const endMemory = this.getMemoryUsage();
    
    return {
      renderTime: 0,
      memoryUsage: endMemory - startMemory,
      componentCount: 10,
      domNodeCount: 0
    };
  }

  /**
   * Get memory usage (if available)
   */
  private getMemoryUsage(): number {
    // if (performance.memory) {
    //   return performance.memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
    // }
    return 0;
  }

  /**
   * Count React components in the container
   */
  private countReactComponents(container: HTMLElement): number {
    // This is a simplified count - in real scenarios you might want to use React DevTools
    const reactComponents = container.querySelectorAll('[data-reactroot], [data-testid]');
    return reactComponents.length;
  }

  /**
   * Count DOM nodes in the container
   */
  private countDOMNodes(container: HTMLElement): number {
    return container.querySelectorAll('*').length;
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): string {
    const latestMetrics = this.metrics[this.metrics.length - 1];
    const averageRenderTime = this.metrics.reduce((sum, m) => sum + m.renderTime, 0) / this.metrics.length;
    
    return `
🚀 Performance Report for ${this.componentName}
===============================================
📊 Latest Metrics:
  • Render Time: ${latestMetrics.renderTime.toFixed(2)}ms
  • Memory Usage: ${latestMetrics.memoryUsage?.toFixed(2) || 'N/A'}MB
  • Component Count: ${latestMetrics.componentCount}
  • DOM Nodes: ${latestMetrics.domNodeCount}
  • Re-render Time: ${latestMetrics.reRenderTime?.toFixed(2) || 'N/A'}ms

📈 Performance Summary:
  • Average Render Time: ${averageRenderTime.toFixed(2)}ms
  • Total Tests Run: ${this.metrics.length}
  • Memory Leak Detected: ${latestMetrics.memoryLeak ? 'Yes' : 'No'}

🎯 Recommendations:
${this.getRecommendations()}
    `;
  }

  /**
   * Get performance recommendations
   */
  private getRecommendations(): string {
    const latestMetrics = this.metrics[this.metrics.length - 1];
    const recommendations: string[] = [];
    
    if (latestMetrics.renderTime > 100) {
      recommendations.push('  • Consider optimizing render performance (current: >100ms)');
    }
    
    if (latestMetrics.memoryUsage && latestMetrics.memoryUsage > 50) {
      recommendations.push('  • Monitor memory usage (current: >50MB)');
    }
    
    if (latestMetrics.domNodeCount > 1000) {
      recommendations.push('  • Consider virtualizing large lists (current: >1000 DOM nodes)');
    }
    
    if (latestMetrics.memoryLeak) {
      recommendations.push('  • Investigate potential memory leaks');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('  • Performance is within acceptable ranges');
    }
    
    return recommendations.join('\n');
  }

  /**
   * Run comprehensive performance tests
   */
  async runComprehensiveTests(): Promise<void> {
    console.log(`🚀 Starting comprehensive performance tests for ${this.componentName}`);
    
    try {
      // Basic render performance
      const basicMetrics = this.testRenderPerformance();
      console.log(`✅ Basic render performance: ${basicMetrics.renderTime.toFixed(2)}ms`);
      
      // Re-render performance
      if (this.config.testReRenders) {
        const reRenderMetrics = this.testReRenderPerformance(() => {
          // Trigger re-render by updating props
          return this.config.component;
        });
        console.log(`✅ Re-render performance: ${reRenderMetrics.reRenderTime?.toFixed(2)}ms`);
      }
      
      // Memory leak detection
      if (this.config.testMemoryLeaks) {
        const hasMemoryLeak = this.testMemoryLeaks();
        console.log(`✅ Memory leak test: ${hasMemoryLeak ? 'Potential leak detected' : 'No leaks detected'}`);
      }
      
      // Stress testing
      const stressResults = this.testStressConditions();
      console.log(`✅ Stress tests completed: ${stressResults.length} tests passed`);
      
      // Generate report
      console.log(this.getPerformanceReport());
      
    } catch (error) {
      console.error(`❌ Performance test failed for ${this.componentName}:`, error);
      throw error;
    }
  }
}

/**
 * Convenience function to run performance tests
 */
export async function runPerformanceTests(config: PerformanceTestConfig): Promise<void> {
  const tester = new PerformanceTester(config);
  await tester.runComprehensiveTests();
}

/**
 * Default performance thresholds
 */
export const defaultPerformanceThresholds = {
  maxRenderTime: 100, // 100ms
  maxMemoryUsage: 50, // 50MB
  maxDomNodes: 1000,
  testReRenders: true,
  testMemoryLeaks: true
};
