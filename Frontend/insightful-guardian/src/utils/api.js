const BASE_URL = 'http://localhost:8000';

export const getAuthToken = () => {
    const user = localStorage.getItem('shiksha_user');
    if (user) {
        try {
            const parsed = JSON.parse(user);
            return parsed.token || null;
        } catch (e) {
            return null;
        }
    }
    return null;
};

export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('shiksha_user');
        window.location.href = '/';
        throw new Error('Unauthorized');
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || 'Request failed');
    }

    return response.json();
};

export const authAPI = {
    login: (email, password) => fetchWithAuth('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
};

export const dashboardAPI = {
    getStats: () => fetchWithAuth('/dashboard')
};

export const studentsAPI = {
    getAll: (sortBy = 'id', order = 'asc') => fetchWithAuth(`/students?sort_by=${sortBy}&order=${order}`),
    addStudent: (data) => fetchWithAuth('/students', {
        method: 'POST',
        body: JSON.stringify(data)
    }),
    predictRisk: (data) => fetchWithAuth('/predict', {
        method: 'POST',
        body: JSON.stringify(data)
    })
};

export const mentorAPI = {
    assignMentor: (studentId, mentorId, enforceHighRisk = true) => fetchWithAuth('/assign-mentor', {
        method: 'POST',
        body: JSON.stringify({ student_id: studentId, mentor_id: mentorId, enforce_high_risk: enforceHighRisk })
    })
};
