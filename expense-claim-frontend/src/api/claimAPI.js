import axiosInstance from './axiosConfig';

// Base endpoint for claims
const CLAIM_ENDPOINT = '/claims';

/**
 * Submit a new expense claim
 * @param {Object} claimData - Claim data object
 * @param {string} claimData.employeeName - Name of employee
 * @param {string} claimData.department - Department name (e.g., "ENGINEERING")
 * @param {string} claimData.category - Expense category (e.g., "TRAVEL")
 * @param {number} claimData.amount - Expense amount
 * @param {string} claimData.expenseDate - Date of expense (YYYY-MM-DD)
 * @param {string} claimData.description - Expense description
 * @returns {Promise<Object>} Submitted claim data
 */
export const submitClaim = async (claimData) => {
    try {
        const response = await axiosInstance.post(`${CLAIM_ENDPOINT}/submit`, claimData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Review a claim (Approve or Reject)
 * @param {Object} reviewData - Review data
 * @param {number} reviewData.claimId - ID of the claim to review
 * @param {string} reviewData.status - "APPROVED" or "REJECTED"
 * @param {string} reviewData.reviewRemark - Review remark/comment
 * @returns {Promise<Object>} Updated claim data
 */
export const reviewClaim = async (reviewData) => {
    try {
        const response = await axiosInstance.put(`${CLAIM_ENDPOINT}/review`, reviewData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all claims
 * @returns {Promise<Array>} List of all claims
 */
export const getAllClaims = async () => {
    try {
        const response = await axiosInstance.get(`${CLAIM_ENDPOINT}/all`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get claim by ID
 * @param {number} id - Claim ID
 * @returns {Promise<Object>} Claim data
 */
export const getClaimById = async (id) => {
    try {
        const response = await axiosInstance.get(`${CLAIM_ENDPOINT}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get claims by department
 * @param {string} department - Department name
 * @returns {Promise<Array>} List of claims for the department
 */
export const getClaimsByDepartment = async (department) => {
    try {
        const response = await axiosInstance.get(`${CLAIM_ENDPOINT}/department/${department}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get claims by status
 * @param {string} status - Claim status ("PENDING", "APPROVED", "REJECTED")
 * @returns {Promise<Array>} List of claims with the status
 */
export const getClaimsByStatus = async (status) => {
    try {
        const response = await axiosInstance.get(`${CLAIM_ENDPOINT}/status/${status}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get claims by month and year
 * @param {string} monthYear - Month and year in format "MM-YYYY"
 * @returns {Promise<Array>} List of claims for the month
 */
export const getClaimsByMonthYear = async (monthYear) => {
    try {
        const response = await axiosInstance.get(`${CLAIM_ENDPOINT}/month/${monthYear}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get claims with multiple filters
 * @param {Object} filters - Filter parameters
 * @param {string} filters.department - Department name (optional)
 * @param {string} filters.monthYear - Month and year (optional)
 * @param {string} filters.status - Claim status (optional)
 * @param {string} filters.category - Expense category (optional)
 * @returns {Promise<Array>} Filtered list of claims
 */
export const getClaimsByFilters = async (filters = {}) => {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();
        
        if (filters.department) queryParams.append('department', filters.department);
        if (filters.monthYear) queryParams.append('monthYear', filters.monthYear);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.category) queryParams.append('category', filters.category);
        
        const queryString = queryParams.toString();
        const url = queryString ? `${CLAIM_ENDPOINT}/filter?${queryString}` : `${CLAIM_ENDPOINT}/filter`;
        
        const response = await axiosInstance.get(url);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get monthly financial summary for a department
 * @param {Object} params - Summary parameters
 * @param {string} params.department - Department name
 * @param {number} params.month - Month number (1-12)
 * @param {number} params.year - Year
 * @returns {Promise<Object>} Monthly summary data
 */
export const getMonthlySummary = async ({ department, month, year }) => {
    try {
        const response = await axiosInstance.get(
            `${CLAIM_ENDPOINT}/summary?department=${department}&month=${month}&year=${year}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};