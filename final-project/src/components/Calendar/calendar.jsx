import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';
import YearView from './YearView';
import WorkWeekView from './WorkWeekView';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month'); 

    const renderView = () => {
        switch (currentView) {
            case 'day':
                return <DayView date={currentDate} />;
            case 'week':
                return <WeekView date={currentDate} />;
            case 'month':
                return <MonthView date={currentDate} />;
            case 'year':
                return <YearView date={currentDate} />;
            case 'workWeek':
                return <WorkWeekView date={currentDate} />;
            default:
                return <MonthView date={currentDate} />;
        }
    };

    return (
        <Box className="calendar-container" p={5}>
            <ButtonGroup variant="outline" spacing="6">
                <Button onClick={() => setCurrentView('day')}>Day</Button>
                <Button onClick={() => setCurrentView('week')}>Week</Button>
                <Button onClick={() => setCurrentView('month')}>Month</Button>
                <Button onClick={() => setCurrentView('year')}>Year</Button>
                <Button onClick={() => setCurrentView('workWeek')}>Work Week</Button>
            </ButtonGroup>
            <Box className="calendar-grid" mt={5}>
                {renderView()}
            </Box>
        </Box>
    );
}

export default Calendar;
