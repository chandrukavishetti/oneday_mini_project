import axiosInstance from './axiosConfig';

// Base endpoint for budgets
const BUDGET_ENDPOINT = '/budgets';

/**
 * Create a new department budget
 * @param {Object} budgetData - Budget data
 * @param {string} budgetData.department - Department name (e.g., "ENGINEERING")
 * @param {number} budgetData.month - Month number (1-12)
 * @param {number} budgetData.year - Year
 * @param {number} budgetData.budgetAmount - Budget amount
 * @returns {Promise<Object>} Created budget data
 */
export const createBudget = async (budgetData) => {
    try {
        const response = await axiosInstance.post(`${BUDGET_ENDPOINT}/create`, budgetData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Update an existing budget
 * @param {number} id - Budget ID
 * @param {Object} budgetData - Updated budget data
 * @param {string} budgetData.department - Department name
 * @param {number} budgetData.month - Month number (1-12)
 * @param {number} budgetData.year - Year
 * @param {number} budgetData.budgetAmount - Budget amount
 * @returns {Promise<Object>} Updated budget data
 */
export const updateBudget = async (id, budgetData) => {
    try {
        const response = await axiosInstance.put(`${BUDGET_ENDPOINT}/update/${id}`, budgetData);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all budgets
 * @returns {Promise<Array>} List of all budgets
 */
export const getAllBudgets = async () => {
    try {
        const response = await axiosInstance.get(`${BUDGET_ENDPOINT}/all`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get budget by ID
 * @param {number} id - Budget ID
 * @returns {Promise<Object>} Budget data
 */
export const getBudgetById = async (id) => {
    try {
        const response = await axiosInstance.get(`${BUDGET_ENDPOINT}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Get budget by department, month, and year
 * @param {Object} params - Search parameters
 * @param {string} params.department - Department name
 * @param {number} params.month - Month number (1-12)
 * @param {number} params.year - Year
 * @returns {Promise<Object>} Budget data
 */
export const getBudgetByDepartmentAndMonthYear = async ({ department, month, year }) => {
    try {
        const response = await axiosInstance.get(
            `${BUDGET_ENDPOINT}/find?department=${department}&month=${month}&year=${year}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a budget
 * @param {number} id - Budget ID
 * @returns {Promise<void>}
 */
export const deleteBudget = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BUDGET_ENDPOINT}/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Check if budget exists for department, month, year
 * @param {Object} params - Check parameters
 * @param {string} params.department - Department name
 * @param {number} params.month - Month number (1-12)
 * @param {number} params.year - Year
 * @returns {Promise<boolean>} True if budget exists
 */
export const checkBudgetExists = async ({ department, month, year }) => {
    try {
        const response = await axiosInstance.get(
            `${BUDGET_ENDPOINT}/exists?department=${department}&month=${month}&year=${year}`
        );
        return response;
    } catch (error) {
        throw error;
    }
};