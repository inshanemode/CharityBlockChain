import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoChevronBack, 
  IoChevronForward,
  IoChevronUp,
  IoChevronDown,
} from 'react-icons/io5';
import { COLORS } from '../styles/liquidGlass';
import GlassButton from './base/GlassButton';

/**
 * TransactionTable Component
 * 
 * Reusable glass table với sorting và pagination
 * 
 * Props:
 * - data: array (required) - Table data
 * - columns: array (required) - Column definitions
 *   [{key, label, render?, sortable?, width?}]
 * - loading: boolean - Loading state
 * - itemsPerPage: number - Items per page (default 10)
 * - onRowClick: function - Row click handler
 */

const TransactionTable = ({ 
  data = [], 
  columns = [],
  loading = false,
  itemsPerPage = 10,
  onRowClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Handle sort
  const handleSort = (key) => {
    if (!columns.find(col => col.key === key)?.sortable) return;

    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div
        style={{
          background: COLORS.glass.medium,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${COLORS.border.default}`,
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '50px',
            height: '50px',
            margin: '0 auto',
            border: `3px solid ${COLORS.border.default}`,
            borderTopColor: COLORS.glow.cyan,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div style={{ marginTop: '1rem', color: COLORS.text.secondary }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: COLORS.glass.medium,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${COLORS.border.default}`,
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      {/* Table container với horizontal scroll on mobile */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '800px',
          }}
        >
          {/* Table header */}
          <thead>
            <tr
              style={{
                background: COLORS.glass.heavy,
                backdropFilter: 'blur(30px)',
                position: 'sticky',
                top: 0,
                zIndex: 10,
              }}
            >
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: COLORS.text.light,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    borderBottom: `1px solid ${COLORS.border.default}`,
                    width: column.width || 'auto',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {column.label}
                    {column.sortable && sortConfig.key === column.key && (
                      <span style={{ color: COLORS.glow.cyan }}>
                        {sortConfig.direction === 'asc' ? (
                          <IoChevronUp size={16} />
                        ) : (
                          <IoChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            <AnimatePresence mode="wait">
              {paginatedData.map((row, index) => (
                <motion.tr
                  key={index}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{
                    background: index % 2 === 0 
                      ? 'rgba(255, 255, 255, 0.02)' 
                      : 'transparent',
                    cursor: onRowClick ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={onRowClick ? {
                    background: COLORS.glass.light,
                    boxShadow: `inset 0 0 20px ${COLORS.glow.cyan}`,
                  } : {}}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{
                        padding: '1.25rem 1.5rem',
                        fontSize: '0.95rem',
                        color: COLORS.text.secondary,
                        borderBottom: `1px solid ${COLORS.border.default}`,
                      }}
                    >
                      {column.render 
                        ? column.render(row[column.key], row) 
                        : row[column.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            borderTop: `1px solid ${COLORS.border.default}`,
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Page info */}
          <div style={{ color: COLORS.text.secondary, fontSize: '0.9rem' }}>
            Showing {startIndex + 1} - {Math.min(endIndex, sortedData.length)} of {sortedData.length}
          </div>

          {/* Page buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Previous button */}
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              icon={<IoChevronBack size={16} />}
            >
              Prev
            </GlassButton>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <GlassButton
                  key={pageNum}
                  variant={currentPage === pageNum ? 'primary' : 'secondary'}
                  size="sm"
                  glow={currentPage === pageNum ? 'cyan' : null}
                  onClick={() => handlePageChange(pageNum)}
                  style={{ minWidth: '40px' }}
                >
                  {pageNum}
                </GlassButton>
              );
            })}

            {/* Next button */}
            <GlassButton
              variant="secondary"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              icon={<IoChevronForward size={16} />}
              iconPosition="right"
            >
              Next
            </GlassButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;