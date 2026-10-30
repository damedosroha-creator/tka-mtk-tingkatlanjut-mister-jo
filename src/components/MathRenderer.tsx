import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  block = false,
}) => {
  if (!content) return null;

  // Function to render pure latex segment safely
  const renderLatex = (latex: string, isBlock: boolean): string => {
    try {
      return katex.renderToString(latex.trim(), {
        displayMode: isBlock,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      // Safe fallback
      return `<span class="font-mono text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded text-sm">${latex}</span>`;
    }
  };

  // If the whole content is designated as a block math formula
  if (block) {
    const raw = content.replace(/^(\$\$|\\\[)|(\$\$|\\\])$/g, '');
    const html = renderLatex(raw, true);
    return (
      <div
        className={`overflow-x-auto py-2 my-1 text-center ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Parse mixed text with $...$ or $$...$$
  const parts: React.ReactNode[] = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.slice(lastIndex, match.index)}
        </span>
      );
    }

    const matchedStr = match[0];
    const isBlockMath = matchedStr.startsWith('$$') || matchedStr.startsWith('\\[');
    const mathCode = matchedStr
      .replace(/^(\$\$|\$|\\\[|\\\()/, '')
      .replace(/(\$\$|\$|\\\]|\\\))$/, '');

    const rendered = renderLatex(mathCode, isBlockMath);

    if (isBlockMath) {
      parts.push(
        <div
          key={`math-${match.index}`}
          className="my-2 overflow-x-auto text-center"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      );
    } else {
      parts.push(
        <span
          key={`math-${match.index}`}
          className="inline-block mx-0.5 align-middle"
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(
      <span key={`text-${lastIndex}`}>
        {content.slice(lastIndex)}
      </span>
    );
  }

  return <span className={className}>{parts.length > 0 ? parts : content}</span>;
};

export default MathRenderer;
