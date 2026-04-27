export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncate = (text, length = 100) => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
};

export const getTechStackSummary = (techStack) => {
  const categories = {
    frontend: techStack.filter(t => t.category === 'frontend').map(t => t.name),
    backend: techStack.filter(t => t.category === 'backend').map(t => t.name),
    database: techStack.filter(t => t.category === 'database').map(t => t.name),
    devops: techStack.filter(t => t.category === 'devops').map(t => t.name),
    other: techStack.filter(t => t.category === 'other').map(t => t.name),
  };
  return categories;
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
