const axios = require('axios');
const API_URL = process.env.API_URL;

const student = {
    dashboard: (req, res, next) => {
        res.render('student/dashboard', { title: 'Dashboard' });
    },
    getAnnouncement: async (req, res, next) => {
        try {
            const user = req.session.acc;
            const receives = (await axios.get(`${API_URL}ancm/list/receive/${user._id}`)).data;
            let countAnnouncement = 0;
            let countRemind = 0;
            let countInvitation = 0;
            receives.forEach((element) => {
                if (element.type == 'remind') countRemind++;
                else if (element.type == 'announcement') countAnnouncement++;
                else countInvitation++;
            });
            const success = req.flash('success') || '';
            const error = req.flash('error') || '';
            res.render('student/announcement', {
                title: 'Announcement',
                receives,
                success,
                error,
                countAnnouncement,
                countRemind,
                countInvitation,
            });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },
    getAttendance: async (req, res, next) => {
        try {
            const user = req.session.acc;
            const attendances = (await axios.get(`${API_URL}attend/list/${user._id}`)).data;
            res.render('student/attendance', { title: 'Attendance', attendances });
        } catch (error) {
            console.error(error);
            res.render('error', { title: 'Error', layout: 'auth', message: 'Something went wrong' });
        }
    },
    getSchedule: (req, res, next) => {
        res.render('student/schedule', { title: 'Schedule' });
    },
    getScores: (req, res, next) => {
        res.render('student/scoreboard', { title: 'Scoreboard' });
    },
};

module.exports = student;
