require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goguy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Schemas
const customerSchema = new mongoose.Schema({
    name: String,
    nic: String,
    purpose: String,
    passengers: Number,
    distance: Number,
    date: String,
    pickup: String,
    whatsapp: String,
    phone: String,
    registeredDate: String,
    createdAt: { type: Date, default: Date.now }
});

const driverSchema = new mongoose.Schema({
    name: String,
    nic: String,
    vehicleType: String,
    vehicleModel: String,
    vehicleNumber: String,
    pricePerKm: Number,
    photo: String,
    whatsapp: String,
    phone: String,
    registeredDate: String,
    createdAt: { type: Date, default: Date.now }
});

const scheduleSchema = new mongoose.Schema({
    customerId: String,
    driverId: String,
    date: String,
    customerName: String,
    driverName: String,
    vehicleInfo: String,
    estimatedCost: Number,
    scheduledDate: String,
    createdAt: { type: Date, default: Date.now }
});

// Models
const Customer = mongoose.model('Customer', customerSchema);
const Driver = mongoose.model('Driver', driverSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

// ==================== CUSTOMER ROUTES ====================

// Get all customers
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add customer
app.post('/api/customers', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        const savedCustomer = await customer.save();
        res.json(savedCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get customer by ID
app.get('/api/customers/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete customer
app.delete('/api/customers/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        // Also delete related schedules
        await Schedule.deleteMany({ customerId: req.params.id });
        res.json({ message: 'Customer deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== DRIVER ROUTES ====================

// Get all drivers
app.get('/api/drivers', async (req, res) => {
    try {
        const drivers = await Driver.find().sort({ createdAt: -1 });
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add driver
app.post('/api/drivers', async (req, res) => {
    try {
        const driver = new Driver(req.body);
        const savedDriver = await driver.save();
        res.json(savedDriver);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get driver by ID
app.get('/api/drivers/:id', async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        res.json(driver);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete driver
app.delete('/api/drivers/:id', async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        // Also delete related schedules
        await Schedule.deleteMany({ driverId: req.params.id });
        res.json({ message: 'Driver deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== SCHEDULE ROUTES ====================

// Get all schedules
app.get('/api/schedules', async (req, res) => {
    try {
        const schedules = await Schedule.find().sort({ createdAt: -1 });
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get schedules for driver on specific date
app.get('/api/schedules/driver/:driverId/:date', async (req, res) => {
    try {
        const schedules = await Schedule.find({
            driverId: req.params.driverId,
            date: req.params.date
        });
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add schedule
app.post('/api/schedules', async (req, res) => {
    try {
        const schedule = new Schedule(req.body);
        const savedSchedule = await schedule.save();
        res.json(savedSchedule);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete schedule
app.delete('/api/schedules/:id', async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.json({ message: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== STATS ROUTE ====================

// Get dashboard stats
app.get('/api/stats/:date', async (req, res) => {
    try {
        const date = req.params.date;
        const drivers = await Driver.find();
        const customers = await Customer.find();
        
        let availableCount = 0;
        let onRideCount = 0;

        for (let driver of drivers) {
            const schedules = await Schedule.findOne({
                driverId: driver._id.toString(),
                date: date
            });
            if (schedules) {
                onRideCount++;
            } else {
                availableCount++;
            }
        }

        res.json({
            totalDrivers: drivers.length,
            availableNow: availableCount,
            onRide: onRideCount,
            totalCustomers: customers.length
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Serve static files
app.use(express.static('.'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
