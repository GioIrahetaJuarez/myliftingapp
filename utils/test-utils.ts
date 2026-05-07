import React from 'react';
import { create } from 'react-test-renderer';

/**
 * Simple test utilities for React Native components
 * Using react-test-renderer directly for stability with Expo SDK 54
 */

export const render = (component: React.ReactElement) => {
  const renderer = create(component);
  return {
    ...renderer,
    // Simple text finder
    getByText: (text: string) => {
      const findText = (node: any): any => {
        if (node.children && Array.isArray(node.children)) {
          for (const child of node.children) {
            if (typeof child === 'string' && child.includes(text)) {
              return node;
            }
            if (typeof child === 'object' && child !== null) {
              const found = findText(child);
              if (found) return found;
            }
          }
        }
        if (node.props && node.props.children) {
          if (Array.isArray(node.props.children)) {
            for (const child of node.props.children) {
              if (typeof child === 'string' && child.includes(text)) {
                return node;
              }
              if (typeof child === 'object' && child !== null) {
                const found = findText(child);
                if (found) return found;
              }
            }
          } else if (typeof node.props.children === 'string' && node.props.children.includes(text)) {
            return node;
          }
        }
        return null;
      };

      const json = renderer.toJSON();
      const result = findText(json);
      if (!result) {
        throw new Error(`Text "${text}" not found in component`);
      }
      return result;
    },

    // Simple testID finder
    getByTestId: (testId: string) => {
      const findByTestId = (node: any): any => {
        if (node.props && node.props.testID === testId) {
          return node;
        }
        if (node.children && Array.isArray(node.children)) {
          for (const child of node.children) {
            if (typeof child === 'object' && child !== null) {
              const found = findByTestId(child);
              if (found) return found;
            }
          }
        }
        if (node.props && node.props.children) {
          if (Array.isArray(node.props.children)) {
            for (const child of node.props.children) {
              if (typeof child === 'object' && child !== null) {
                const found = findByTestId(child);
                if (found) return found;
              }
            }
          }
        }
        return null;
      };

      const json = renderer.toJSON();
      const result = findByTestId(json);
      if (!result) {
        throw new Error(`TestID "${testId}" not found in component`);
      }
      return result;
    },

    // Get the rendered JSON tree
    toJSON: () => renderer.toJSON(),

    // Unmount the component
    unmount: () => renderer.unmount(),
  };
};

// Helper to wait for async operations
export const waitFor = (callback: () => void | Promise<void>, options = { timeout: 5000 }) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = async () => {
      try {
        await callback();
        resolve(undefined);
      } catch (error) {
        if (Date.now() - startTime > options.timeout) {
          reject(error);
        } else {
          setTimeout(check, 50);
        }
      }
    };

    check();
  });
};
