import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress, TextField, 
         Button, IconButton, Paper, Container, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import SearchIcon from '@mui/icons-material/Search';
import NightsStayIcon from '@mui/icons-material/NightsStay';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
    background: theme.palette.mode === 'dark' 
        ? 'linear-gradient(45deg, #1a237e 30%, #311b92 90%)'
        : 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    borderRadius: 15,
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
}));

const WeatherIcon = styled(Box)(({ theme }) => ({
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
    animation: 'float 3s ease-in-out infinite',
    '@keyframes float': {
        '0%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-10px)' },
        '100%': { transform: 'translateY(0px)' },
    },
}));

const SearchBar = styled(Paper)(({ theme }) => ({
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: '20px auto',
    borderRadius: 20,
}));

const Forecast = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [currentAPI, setCurrentAPI] = useState('weatherapi'); // or 'tomorrow' or 'weatherbit'

    // Free Weather API endpoints
    const APIs = {
        weatherapi: {
            url: 'https://api.weatherapi.com/v1/forecast.json',
            key: '04864e1e6fed46a4aaa164706250601' // Free tier available
        },
        tomorrow: {
            url: 'https://api.tomorrow.io/v4/weather/forecast',
            key: 'W4LVf3SdCM3avFZcwCGQj9rWgzxPi8T8' // Free tier available
        },
        weatherbit: {
            url: 'https://api.weatherbit.io/v2.0/forecast/daily',
            key: '671d0954241644158988feb6db8d6444' // Free tier available
        }
    };

    const fetchWeather = async () => {
        if (!location) return;
        
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${APIs[currentAPI].url}?key=${APIs[currentAPI].key}&q=${location}&days=5`
            );
            
            if (!response.ok) {
                throw new Error('Weather data not available');
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeather();
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Get user's location on component mount
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation(`${position.coords.latitude},${position.coords.longitude}`);
            });
        }
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
                Weather Forecast
            </Typography>

            <SearchBar component="form" onSubmit={handleSearch}>
                <TextField
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <IconButton type="submit" sx={{ p: '10px' }}>
                    <SearchIcon />
                </IconButton>
            </SearchBar>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                sx={{ mb: 3 }}
            >
                <Tab label="Current" />
                <Tab label="Hourly" />
                <Tab label="5-Day Forecast" />
            </Tabs>

            {loading && (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            )}

            {weatherData && !loading && (
                <Grid container spacing={3}>
                    {/* Current Weather */}
                    {activeTab === 0 && (
                        <Grid item xs={12}>
                            <StyledCard>
                                <CardContent>
                                    <WeatherIcon>
                                        {getWeatherIcon(weatherData.current.condition.code)}
                                    </WeatherIcon>
                                    <Typography variant="h4" gutterBottom>
                                        {weatherData.current.temp_c}°C
                                    </Typography>
                                    <Typography variant="h6">
                                        {weatherData.current.condition.text}
                                    </Typography>
                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={6}>
                                            <Box display="flex" alignItems="center">
                                                <OpacityIcon sx={{ mr: 1 }} />
                                                <Typography>
                                                    Humidity: {weatherData.current.humidity}%
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box display="flex" alignItems="center">
                                                <AirIcon sx={{ mr: 1 }} />
                                                <Typography>
                                                    Wind: {weatherData.current.wind_kph} km/h
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    )}

                    {/* Hourly Forecast */}
                    {activeTab === 1 && (
                        <Grid container spacing={2}>
                            {weatherData.forecast.forecastday[0].hour
                                .filter((_, index) => index % 3 === 0)
                                .map((hour, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <StyledCard>
                                            <CardContent>
                                                <Typography variant="h6">
                                                    {new Date(hour.time).toLocaleTimeString()}
                                                </Typography>
                                                <WeatherIcon>
                                                    {getWeatherIcon(hour.condition.code)}
                                                </WeatherIcon>
                                                <Typography variant="h5">
                                                    {hour.temp_c}°C
                                                </Typography>
                                            </CardContent>
                                        </StyledCard>
                                    </Grid>
                                ))}
                        </Grid>
                    )}

                    {/* 5-Day Forecast */}
                    {activeTab === 2 && (
                        <Grid container spacing={2}>
                            {weatherData.forecast.forecastday.map((day, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <StyledCard>
                                        <CardContent>
                                            <Typography variant="h6">
                                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                                            </Typography>
                                            <WeatherIcon>
                                                {getWeatherIcon(day.day.condition.code)}
                                            </WeatherIcon>
                                            <Typography variant="h5">
                                                {day.day.avgtemp_c}°C
                                            </Typography>
                                            <Typography variant="body2">
                                                {day.day.condition.text}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            )}
        </Container>
    );
};

// Helper function to get weather icons based on condition codes
const getWeatherIcon = (code) => {
    // This is a simplified version - you can expand this based on the API's condition codes
    if (code < 300) return <WbSunnyIcon fontSize="inherit" />;
    if (code < 500) return <CloudIcon fontSize="inherit" />;
    if (code < 600) return <OpacityIcon fontSize="inherit" />;
    return <NightsStayIcon fontSize="inherit" />;
};

export default Forecast;
