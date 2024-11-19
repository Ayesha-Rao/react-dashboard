
import React, { useState, useEffect } from 'react';
import Navbar from './components/AppBar';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const App: React.FC = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [projects, setProjects] = useState<
    { id: string; name: string; owner: string; date: string; image: string }[]
  >([]);
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    owner: string;
    date: string;
    image: string;
  } | null>(null);

  // Fetch projects from Firestore when the component loads
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsList: {
        id: string;
        name: string;
        owner: string;
        date: string;
        image: string;
      }[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projectsList.push({
          id: doc.id,
          name: data.name,
          owner: data.owner || 'Unknown Owner', // Default if not set
          date: data.date || 'Unknown Date', // Default if not set
          image: data.image || 'https://via.placeholder.com/150', // Default placeholder
        });
      });
      setProjects(projectsList);
    };

    fetchProjects();
  }, []);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenDetails = (project: {
    name: string;
    owner: string;
    date: string;
    image: string;
  }) => {
    setSelectedProject(project);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const handleAddProject = async () => {
    if (projectName.trim() && imageURL.trim()) {
      try {
        const newProject = {
          name: projectName,
          owner: 'John Doe', // Replace with dynamic owner if available
          date: new Date().toLocaleDateString(), // Current date
          image: imageURL, // Image URL from input
        };

        // Add project to Firestore
        const docRef = await addDoc(collection(db, 'projects'), newProject);

        // Update state with new project
        setProjects([...projects, { id: docRef.id, ...newProject }]);
        setProjectName('');
        setImageURL('');
        handleCloseAdd();
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ padding: '20px' }}>
        {/* Greeting Section */}
        <Box
      sx={{
        backgroundImage: 'url(images/travel.jpg)', // Replace with actual image path
        backgroundSize: 'cover', // Ensures the entire image is visible
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        backgroundPosition: 'center', // Centers the image
        borderRadius: 14,
        padding: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        mb: 7,
      }}
        >
          <Typography variant="h4">Hi 👋 James Doe</Typography>
          <Typography variant="body1">Welcome to your project dashboard</Typography>
          <Button
            variant="contained"
            sx={{ mt: 4, bgcolor: '#6A1B9A' , borderRadius: 14, mb: 2}}
            onClick={handleOpenAdd}
          >
            Add New Project
          </Button>
        </Box>

        {/* Projects Cards */}
        <Typography variant="h5" gutterBottom>
          Added CheckIns
        </Typography>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={3} key={project.id}>
              <Card sx={{ maxWidth: 345, borderRadius: 7}}>
                <Box
                  sx={{
                    height: 160,
                    padding: 2,
                    backgroundImage: `url(${project.image})`, // Use dynamic image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Owner:</strong> {project.owner}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Date:</strong> {project.date}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDetails(project)}
                    sx={{ mt: 1, bgcolor: '#6A1B9A' , borderRadius: 14,}}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Modal for adding a new project */}
        <Modal open={openAdd} onClose={handleCloseAdd}>
          <Box sx={modalStyle}>
            <Typography variant="h6" gutterBottom>
              Add New Project
            </Typography>
            <TextField
              label="Project Name"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Image URL"
              fullWidth
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddProject}
              disabled={!projectName.trim() || !imageURL.trim()}
            >
              Add Project
            </Button>
          </Box>
        </Modal>

        {/* Modal for viewing project details */}
        <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={modalStyle}>
            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            {selectedProject && (
              <>
                <Typography variant="body1">
                  <strong>Project Name:</strong> {selectedProject.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Owner:</strong> {selectedProject.owner}
                </Typography>
                <Typography variant="body1">
                  <strong>Date Added:</strong> {selectedProject.date}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    height: 140,
                    backgroundImage: `url(${selectedProject.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCloseDetails}
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default App;
