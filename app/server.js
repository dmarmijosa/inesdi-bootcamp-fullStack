const app = require('./app');
const itemRoutes = require('./routes/itemRoutes');

app.use('/api', itemRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
