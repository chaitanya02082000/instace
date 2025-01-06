import React, { useState, useEffect } from 'react';
import { 
    Box, Card, CardContent, Typography, Grid, CircularProgress, TextField, 
    Button, IconButton, Paper, Container, Tabs, Tab, Divider, Chip, List, ListItem,
    ListItemText, ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';
import SearchIcon from '@mui/icons-material/Search';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PublicIcon from '@mui/icons-material/Public';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';

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

const SpaceCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #1a237e 0%, #311b92 100%)'
      : 'linear-gradient(135deg, #bbdefb 0%, #42a5f5 100%)',
  padding: theme.spacing(2),
  borderRadius: 15,
  marginTop: theme.spacing(2),
}));

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  '& .MuiListItem-root': {
      marginBottom: theme.spacing(2),
      background: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.02)',
      borderRadius: theme.spacing(1),
      transition: 'all 0.3s ease',
      '&:hover': {
          background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.05)',
          transform: 'translateX(5px)',
      },
  },
}));

const DateTimeDisplay = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  margin: theme.spacing(2, 0),
  color: theme.palette.text.secondary,
}));

const Forecast = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [moonData, setMoonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    const APIs = {
      weatherapi: {
          url: 'https://api.weatherapi.com/v1/forecast.json',
          key: '04864e1e6fed46a4aaa164706250601'
      }
  };

    useEffect(() => {
        // Update current time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        // Get initial location and data
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`${latitude},${longitude}`);
                fetchAllData(latitude, longitude);
            }, (error) => {
                setError('Unable to get location. Please enter manually.');
                setLocation('London');
                fetchAllData('London');
            });
        }

        return () => clearInterval(timer);
    }, []);
    const fetchAllData = async (searchLocation) => {
        setLoading(true);
        try {
            // Fetch Weather Data with astronomy
            const weatherResponse = await fetch(
                `${APIs.weatherapi.url}?key=${APIs.weatherapi.key}&q=${searchLocation}&days=1&aqi=yes&astronomy=yes`
            );
            if (!weatherResponse.ok) throw new Error('Weather data not available');
            const weatherData = await weatherResponse.json();
    
            // Calculate moon age (0-29.5 days)
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
    
            // Calculate moon phase
            const moonPhaseResponse = await fetch(
                `https://api.farmsense.net/v1/moonphases/?d=${Math.floor(date.getTime() / 1000)}`
            );
            if (!moonPhaseResponse.ok) throw new Error('Moon data not available');
            const moonPhaseData = await moonPhaseResponse.json();
    
            // Combine weather and moon data
            const moonData = {
                ...weatherData.forecast.forecastday[0].astro,
                phase_name: getMoonPhaseName(moonPhaseData[0].Phase),
                illumination: moonPhaseData[0].Illumination * 100
            };
    
            setWeatherData(weatherData);
            setMoonData(moonData);
            setError(null);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(`Failed to fetch data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        if (location.trim()) {
            fetchAllData(location);
        }
    };
    const renderAstronomicalEvents = () => (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Moon Information
                        </Typography>
                        <StyledList>
                            {weatherData && weatherData.forecast?.forecastday[0]?.astro && (
                                <>
                                    <ListItem>
                                        <ListItemIcon>
                                            <NightsStayIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Moon Phase"
                                            secondary={weatherData.forecast.forecastday[0].astro.moon_phase}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PublicIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Moon Illumination"
                                            secondary={`${weatherData.forecast.forecastday[0].astro.moon_illumination}%`}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WbSunnyIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Moonrise"
                                            secondary={weatherData.forecast.forecastday[0].astro.moonrise}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <NightsStayIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Moonset"
                                            secondary={weatherData.forecast.forecastday[0].astro.moonset}
                                        />
                                    </ListItem>
                                </>
                            )}
                        </StyledList>
                    </CardContent>
                </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Sun Information
                        </Typography>
                        <StyledList>
                            {weatherData && weatherData.forecast?.forecastday[0]?.astro && (
                                <>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WbSunnyIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Sunrise"
                                            secondary={weatherData.forecast.forecastday[0].astro.sunrise}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <NightsStayIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Sunset"
                                            secondary={weatherData.forecast.forecastday[0].astro.sunset}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <WbSunnyIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Day Length"
                                            secondary={calculateDayLength(
                                                weatherData.forecast.forecastday[0].astro.sunrise,
                                                weatherData.forecast.forecastday[0].astro.sunset
                                            )}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PublicIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Current Time"
                                            secondary={weatherData.location.localtime}
                                        />
                                    </ListItem>
                                </>
                            )}
                        </StyledList>
                    </CardContent>
                </StyledCard>
            </Grid>
            {/* Additional Information Card */}
            <Grid item xs={12}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Location Details
                        </Typography>
                        {weatherData && (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Box display="flex" alignItems="center">
                                        <PublicIcon sx={{ mr: 1 }} />
                                        <Typography>
                                            Latitude: {weatherData.location.lat}°
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box display="flex" alignItems="center">
                                        <PublicIcon sx={{ mr: 1 }} />
                                        <Typography>
                                            Longitude: {weatherData.location.lon}°
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box display="flex" alignItems="center">
                                        <PublicIcon sx={{ mr: 1 }} />
                                        <Typography>
                                            Timezone: {weatherData.location.tz_id}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    );
    
    // Helper function to calculate day length
    const calculateDayLength = (sunrise, sunset) => {
        if (!sunrise || !sunset) return 'N/A';
    
        const sunriseTime = new Date(`2000-01-01 ${sunrise}`);
        const sunsetTime = new Date(`2000-01-01 ${sunset}`);
        
        let diff = sunsetTime - sunriseTime;
        if (diff < 0) diff += 24 * 60 * 60 * 1000;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours} hours ${minutes} minutes`;
    };
    const renderMoonPhase = () => (
        <Grid item xs={12} md={6}>
            <SpaceCard>
                <Typography variant="h5" gutterBottom>
                    Moon Phase
                </Typography>
                {moonData && (
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <NightsStayIcon sx={{ fontSize: 60 }} />
                        <Typography variant="h6">
                            {moonData.phase_name}
                        </Typography>
                        <Typography>
                            Illumination: {moonData.illumination.toFixed(1)}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            Local Time: {weatherData?.location?.localtime}
                        </Typography>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    Moonrise: {moonData.moonrise}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2">
                                    Moonset: {moonData.moonset}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </SpaceCard>
        </Grid>
    );
  
  const renderWeatherSection = () => (
      <Grid container spacing={3}>
          {weatherData && (
              <>
                  <Grid item xs={12}>
                      <DateTimeDisplay variant="h6">
                          {weatherData.location.localtime}
                      </DateTimeDisplay>
                  </Grid>
                  
                  {/* Current Weather Card */}
                  <Grid item xs={12}>
                      <StyledCard>
                          <CardContent>
                              <Box sx={{ textAlign: 'center' }}>
                                  <WeatherIcon>
                                      {getWeatherIcon(weatherData.current.condition.code)}
                                  </WeatherIcon>
                                  <Typography variant="h4" gutterBottom>
                                      {weatherData.current.temp_c}°C
                                  </Typography>
                                  <Typography variant="h6" gutterBottom>
                                      {weatherData.location.name}, {weatherData.location.country}
                                  </Typography>
                                  <Typography variant="subtitle1">
                                      {weatherData.current.condition.text}
                                  </Typography>
                              </Box>
  
                              <Grid container spacing={2} sx={{ mt: 2 }}>
                                  <Grid item xs={4}>
                                      <Box display="flex" alignItems="center" justifyContent="center">
                                          <ThermostatIcon sx={{ mr: 1 }} />
                                          <Typography>
                                              Feels like: {weatherData.current.feelslike_c}°C
                                          </Typography>
                                      </Box>
                                  </Grid>
                                  <Grid item xs={4}>
                                      <Box display="flex" alignItems="center" justifyContent="center">
                                          <OpacityIcon sx={{ mr: 1 }} />
                                          <Typography>
                                              Humidity: {weatherData.current.humidity}%
                                          </Typography>
                                      </Box>
                                  </Grid>
                                  <Grid item xs={4}>
                                      <Box display="flex" alignItems="center" justifyContent="center">
                                          <AirIcon sx={{ mr: 1 }} />
                                          <Typography>
                                              Wind: {weatherData.current.wind_kph} km/h
                                          </Typography>
                                      </Box>
                                  </Grid>
                              </Grid>
  
                              {/* Additional Weather Details */}
                              <Grid container spacing={2} sx={{ mt: 2 }}>
                                  <Grid item xs={6}>
                                      <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                          <Typography variant="subtitle2">Precipitation</Typography>
                                          <Typography>{weatherData.current.precip_mm} mm</Typography>
                                      </Paper>
                                  </Grid>
                                  <Grid item xs={6}>
                                      <Paper sx={{ p: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                          <Typography variant="subtitle2">Pressure</Typography>
                                          <Typography>{weatherData.current.pressure_mb} mb</Typography>
                                      </Paper>
                                  </Grid>
                              </Grid>
                          </CardContent>
                      </StyledCard>
                  </Grid>
  
                  {/* Moon Phase Card */}
                  {renderMoonPhase()}
  
                  {/* Air Quality Card */}
                  <Grid item xs={12} md={6}>
                      <SpaceCard>
                          <Typography variant="h5" gutterBottom>
                              Air Quality
                          </Typography>
                          <StyledList>
                              {weatherData.current.air_quality && (
                                  <ListItem>
                                      <ListItemIcon>
                                          <WaterIcon />
                                      </ListItemIcon>
                                      <ListItemText
                                          primary="Air Quality Index"
                                          secondary={
                                              <Box sx={{ mt: 1 }}>
                                                  <Chip 
                                                      label={getAirQualityLabel(weatherData.current.air_quality['us-epa-index'])}
                                                      color={getAirQualityColor(weatherData.current.air_quality['us-epa-index'])}
                                                      size="small"
                                                  />
                                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                                      PM2.5: {weatherData.current.air_quality.pm2_5?.toFixed(1)} µg/m³
                                                  </Typography>
                                                  <Typography variant="body2">
                                                      PM10: {weatherData.current.air_quality.pm10?.toFixed(1)} µg/m³
                                                  </Typography>
                                              </Box>
                                          }
                                      />
                                  </ListItem>
                              )}
                          </StyledList>
                      </SpaceCard>
                  </Grid>
              </>
          )}
      </Grid>
  );
    return (
        <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom sx={{ mt: 4 }}>
                Weather & Astronomical Forecast
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
                onChange={(e, val) => setActiveTab(val)}
                centered
                sx={{ mb: 3 }}
            >
                <Tab label="Overview" />
                <Tab label="Weather" />
                <Tab label="Astronomical Events" />
            </Tabs>

            {loading ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            ) : (
                <Box sx={{ mt: 3 }}>
                    {activeTab === 0 && renderWeatherSection()}
                    {activeTab === 1 && renderWeatherSection()}
                    {activeTab === 2 && renderAstronomicalEvents()}
                </Box>
            )}
        </Container>
    );
};

// Helper function to get weather icons based on condition codes
const getWeatherIcon = (code) => {
    if (code < 300) return <WbSunnyIcon fontSize="inherit" />;
    if (code < 500) return <CloudIcon fontSize="inherit" />;
    if (code < 600) return <OpacityIcon fontSize="inherit" />;
    return <NightsStayIcon fontSize="inherit" />;
};

// Helper function to get moon phase name
const getMoonPhaseName = (phase) => {
    if (phase === undefined || phase === null) return 'Unknown';
    
    // Convert phase to a value between 0 and 1
    const normalizedPhase = phase - Math.floor(phase);
    
    if (normalizedPhase < 0.0625 || normalizedPhase >= 0.9375) return 'New Moon';
    if (normalizedPhase < 0.1875) return 'Waxing Crescent';
    if (normalizedPhase < 0.3125) return 'First Quarter';
    if (normalizedPhase < 0.4375) return 'Waxing Gibbous';
    if (normalizedPhase < 0.5625) return 'Full Moon';
    if (normalizedPhase < 0.6875) return 'Waning Gibbous';
    if (normalizedPhase < 0.8125) return 'Last Quarter';
    if (normalizedPhase < 0.9375) return 'Waning Crescent';
    
    return 'Unknown';
};
// Helper function for air quality label
const getAirQualityLabel = (index) => {
    const labels = {
        1: 'Good',
        2: 'Moderate',
        3: 'Unhealthy for Sensitive Groups',
        4: 'Unhealthy',
        5: 'Very Unhealthy',
        6: 'Hazardous'
    };
    return labels[index] || 'Unknown';
};

// Helper function for air quality color
const getAirQualityColor = (index) => {
    const colors = {
        1: 'success',
        2: 'info',
        3: 'warning',
        4: 'error',
        5: 'error',
        6: 'error'
    };
    return colors[index] || 'default';
};

export default Forecast;
