import { PrismaClient } from '@prisma/client';
import { setInterval } from 'timers';
const prisma = new PrismaClient();

const areas = ['Substation Area', 'Pump Room Area', 'Production Area', 'Warehouse Area', 'Flow Meter Area'];

const rooms = [
    { name: 'HT Panel Room', areaId: 1 },
    { name: 'LT Room', areaId: 1 },
    { name: 'UPS Room', areaId: 1 },
    { name: 'Compressor Room', areaId: 1 },
    { name: 'Pump Room', areaId: 2 },
    { name: 'Factory Room 1', areaId: 3 },
    { name: 'Factory Room 2', areaId: 4 },
    { name: 'Flow Meter Panel Room', areaId: 5 },
    { name: 'DG Room', areaId: 1 },
];

const panels = [
    { name: 'Pump Status Panel', roomId: 5 },
    { name: 'Water Level Status Panel', roomId: 5 },
    { name: 'Flow Meter Panel', roomId: 8 },
    { name: 'Temperature Panel 1', roomId: 6 },
    { name: 'Humidity Panel 1', roomId: 6 },
    { name: 'Temperature Panel 2', roomId: 7 },
    { name: 'Humidity Panel 2', roomId: 7 },
    { name: 'Compressor Panel', roomId: 4 },
    { name: 'HT Panel', roomId: 1 },
    { name: 'LT Panel', roomId: 2 },
    { name: '100V Panel', roomId: 2 },
    { name: '415V Panel', roomId: 2 },
    { name: 'MLDB Panel', roomId: 2 },
    { name: 'EV Panel', roomId: 2 },
    { name: 'UPS Panel', roomId: 3 },
    { name: 'UPS Unit Panel', roomId: 3 },
    { name: 'DG Set Panel', roomId: 9 },
];

const devices = [
    { name: 'Main Fire Pump', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Jockey Fire Pump', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Engine Driven Pump', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Over Head Fire Pump', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Over Head Fire Pump-2', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Sand Filter Feed Pump-1', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Sand Filter Feed Pump-2', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Back Wash Pump', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Filter Water Supply Pump-1', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Filter Water Supply Pump -2', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Garden Water Pump -1', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Garden Water Pump -2', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Garden Water Pump - 3', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'Garden Water Pump - 4', panelId: 1, deviceTypeId: 1, userId: 1 },
    { name: 'FILTER WATER TANK LEVEL', panelId: 2, deviceTypeId: 2, userId: 1 },
    { name: 'RAW WATER TANK LEVEL', panelId: 2, deviceTypeId: 2, userId: 1 },
    { name: 'GARDEN WATER TANK LEVEL', panelId: 2, deviceTypeId: 2, userId: 1 },
    { name: 'T-1', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-2', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-3', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-4', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-5', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-6', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-7', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-8', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-9', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'T-10', panelId: 4, deviceTypeId: 4, userId: 1 },
    { name: 'H-1', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-2', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-3', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-4', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-5', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-6', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-7', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-8', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-9', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'H-10', panelId: 4, deviceTypeId: 5, userId: 1 },
    { name: 'T-11', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-12', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-13', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-14', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-15', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-16', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-17', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-18', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-19', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-20', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'T-21', panelId: 5, deviceTypeId: 4, userId: 1 },
    { name: 'H-11', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-12', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-13', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-14', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-15', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-16', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-17', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-18', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-19', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-20', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'H-21', panelId: 5, deviceTypeId: 5, userId: 1 },
    { name: 'Compressor-1', panelId: 8, deviceTypeId: 6, userId: 1 },
    { name: 'Compressor-2', panelId: 8, deviceTypeId: 6, userId: 1 },
    { name: 'Air Flow Meter', panelId: 3, deviceTypeId: 3, userId: 1 },
    { name: 'HT Panel', panelId: 9, deviceTypeId: 7, userId: 1 },
    { name: 'MAIN LT PANEL INCOMER', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-AC PHASE-1', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'MLDB FACTORY', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-9 FIRE HYD', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-5 OFFICE G.F', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-02 FACTORY G.F', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-7 LT ROOM', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'SPARE -1', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-4 AC FACTORY OUTDOOR', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-11 CANTEEN FUTURE', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-3 AC FACTORY', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'FEEDER FOR RTCC', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-6 AC _OD TERRACE', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-8 COMPRESSOR ROOM', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'SPARE -2', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-01 ROLLING SHUTTER FACTORY', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'PDB-10 WATER SUPPLY', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'METERING', panelId: 10, deviceTypeId: 7, userId: 1 },
    { name: 'MLTP 100 V PANEL', panelId: 11, deviceTypeId: 7, userId: 1 },
    { name: 'PP-100V-1 MODULE LINE', panelId: 11, deviceTypeId: 7, userId: 1 },
    { name: 'PP-100V-2 MAIN UNIT ASSEMBLY LINE', panelId: 11, deviceTypeId: 7, userId: 1 },
    { name: 'PP-100V -3 FINISHED PRODUCTS', panelId: 11, deviceTypeId: 7, userId: 1 },
    { name: 'SPARE', panelId: 11, deviceTypeId: 7, userId: 1 },
    { name: 'MLTP PROCESS PANEL 415 V', panelId: 12, deviceTypeId: 7, userId: 1 },
    { name: 'PP-01-415 V', panelId: 12, deviceTypeId: 7, userId: 1 },
    { name: 'PP-02-415 V', panelId: 12, deviceTypeId: 7, userId: 1 },
    { name: 'PP-230V 1P ELECTRONICS STORAGE', panelId: 12, deviceTypeId: 7, userId: 1 },
    { name: 'INCOMER FROM SOLAR', panelId: 13, deviceTypeId: 7, userId: 1 },
    { name: 'INCOMER FROM DG', panelId: 13, deviceTypeId: 7, userId: 1 },
    { name: 'INCOMER FROM MLTP', panelId: 13, deviceTypeId: 7, userId: 1 },
    { name: 'BUSCOUPLER', panelId: 13, deviceTypeId: 7, userId: 1 },
    { name: 'UPS INCOMER FROM MAIN MLTP', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'TRF-2 200V 100 KVA', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'UPS-SDB-1 L&P FACTORY', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'PP 415 V', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'PA & FIRE', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'TRF-3 100V 75 KVA', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'UPS SDB-3 ,L&P OFFICE G.F', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'UPS SDB-3 ,L&P OFFICE F.F', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'UPS SPARE -1', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'UPS SDB-2 L&P FACTORY', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'ACCESS CONTROL & CCTV', panelId: 15, deviceTypeId: 7, userId: 1 },
    { name: 'DG SET', panelId: 17, deviceTypeId: 7, userId: 1 },
    { name: 'Garden water flow meter', panelId: 3, deviceTypeId: 3, userId: 1 },
    { name: 'Sewage water flow meter', panelId: 3, deviceTypeId: 3, userId: 1 },
    { name: 'Incoming water flow meter', panelId: 3, deviceTypeId: 3, userId: 1 },
    { name: 'Recycle water flow meter', panelId: 3, deviceTypeId: 3, userId: 1 },
];


const createUsers = async () => {
    const users = [
        { name: 'admin', email: 'admin@example.com', password: 'password123' },
    ];

    try {
        for (const user of users) {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    name: user.name,
                    email: user.email,
                    password: user.password, // Ensure this matches your UserCreateInput requirements
                },
            });
        }
        console.log('Users dumped successfully');
    } catch (error) {
        console.error('Error dumping users:', error);
    } finally {
        await prisma.$disconnect();
    }
};

createUsers();


const dumpAreas = async () => {
    try {
        for (const name of areas) {
            await prisma.area.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }
        console.log('Areas dumped successfully');
    } catch (error) {
        console.error('Error dumping areas:', error);
    }
};

const dumpRooms = async () => {
    try {
        for (const room of rooms) {
            await prisma.room.upsert({
                where: { name: room.name },
                update: {},
                create: { name: room.name, areaId: room.areaId },
            });
        }
        console.log('Rooms dumped successfully');
    } catch (error) {
        console.error('Error dumping rooms:', error);
    }
};

const dumpPanels = async () => {
    try {
        for (const panel of panels) {
            await prisma.panel.upsert({
                where: { name: panel.name },
                update: {},
                create: { name: panel.name, roomId: panel.roomId },
            });
        }
        console.log('Panels dumped successfully');
    } catch (error) {
        console.error('Error dumping panels:', error);
    }
};

const dumpDeviceTypes = async () => {
    const deviceTypes = ['Pump', 'Tank', 'Flow Meter', 'Temperature', 'Humidity', 'Compressor', 'Energy Meter'];

    try {
        for (const name of deviceTypes) {
            await prisma.deviceType.upsert({
                where: { name },
                update: {},
                create: { name },
            });
        }
        console.log('Device types dumped successfully');
    } catch (error) {
        console.error('Error dumping device types:', error);
    }
};

const dumpDevices = async () => {
    try {
        for (const device of devices) {
            await prisma.device.upsert({
                where: { name: device.name },
                update: {
                    panelId: device.panelId,
                    deviceTypeId: device.deviceTypeId,
                    userId: device.userId,
                },
                create: {
                    name: device.name,
                    panelId: device.panelId,
                    deviceTypeId: device.deviceTypeId,
                    userId: device.userId,
                },
            });
        }
        console.log('Devices dumped successfully');
    } catch (error) {
        console.error('Error dumping devices:', error);
    } finally {
        await prisma.$disconnect();
    }
};

const clearAllTables = async () => {
    try {
        await prisma.energyMeterReading.deleteMany({});
        await prisma.flowMeterReading.deleteMany({});
        await prisma.temperatureReading.deleteMany({});
        await prisma.humidityReading.deleteMany({});
        await prisma.compressorReading.deleteMany({});
        await prisma.pumpStatusReading.deleteMany({});
        await prisma.waterLevelReading.deleteMany({});
        await prisma.rule.deleteMany({});
        await prisma.device.deleteMany({});
        await prisma.screen.deleteMany({});
        await prisma.panel.deleteMany({});
        await prisma.room.deleteMany({});
        await prisma.user.deleteMany({});
        await prisma.shift.deleteMany({});
        await prisma.area.deleteMany({});
        await prisma.deviceType.deleteMany({});
        console.log('All tables cleared successfully');
    } catch (error) {
        console.error('Error clearing tables:', error);
    } finally {
        await prisma.$disconnect();
    }
};

const getRandomFloat = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(2);

const createEnergyMeterReadings = async () => {
    const devices = await prisma.device.findMany({
        where: {
            panelId: {
                gte: 9,
                lte: 17,
            },
        },
    });

    const createReading = async (device) => {
        try {
            await prisma.energyMeterReading.create({
                data: {
                    deviceId: device.id,
                    voltageR: parseFloat(getRandomFloat(225, 235)),
                    voltageY: parseFloat(getRandomFloat(225, 235)),
                    voltageB: parseFloat(getRandomFloat(225, 235)),
                    currentR: parseFloat(getRandomFloat(9, 11)),
                    currentY: parseFloat(getRandomFloat(9, 11)),
                    currentB: parseFloat(getRandomFloat(9, 11)),
                    powerFactor: parseFloat(getRandomFloat(0.85, 0.95)),
                    frequency: parseFloat(getRandomFloat(49.5, 50.5)),
                    power: parseFloat(getRandomFloat(10, 15)),
                    powerConsumption: parseFloat(getRandomFloat(90, 110)),
                    kiloVoltAmpere: parseFloat(getRandomFloat(150, 155)),
                    kiloVoltAmpereReactive: parseFloat(getRandomFloat(180, 185)),
                    kiloVoltAmpereHour: parseFloat(getRandomFloat(125, 130)),
                    status: Math.floor(Math.random() * 2), // Assuming status can be 0 or 1
                    createdAt: new Date(),
                },
            });
            console.log(`Reading inserted for device ID: ${device.id}`);
        } catch (error) {
            console.error('Error inserting reading for device ID:', device.id, error);
        }
    };

    setInterval(async () => {
        for (const device of devices) {
            await createReading(device);
        }
    }, 1000);
};
async function createPumpStatusReadings() {
    const devices = await prisma.device.findMany({
        where: { panelId: 1 },
        select: { id: true },
    });

    setInterval(async () => {
        for (const device of devices) {
            await prisma.pumpStatusReading.create({
                data: {
                    deviceId: device.id,
                    status: Math.round(Math.random()),
                    createdAt: new Date(),
                },
            });
            console.log(`Reading inserted for device ID: ${device.id}`);
        }
    }, 1000);
}
const clearEnergyMeterReadings = async () => {
    try {
        await prisma.energyMeterReading.deleteMany({});
        console.log('All energy meter readings have been cleared');
    } catch (error) {
        console.error('Error clearing energy meter readings:', error);
    } finally {
        await prisma.$disconnect();
    }
};
const clearPumpStatusReadings = async () => {
    try {
        await prisma.pumpStatusReading.deleteMany({});
        console.log('All pump status readings have been cleared');
    } catch (error) {
        console.error('Error clearing pump status readings:', error);
    } finally {
        await prisma.$disconnect();
    }
};
const createFlowMeterReadings = async () => {
    const devices = await prisma.device.findMany({
        where: { panelId: 3 },
        select: { id: true },
    });

    const createReading = async (device) => {
        try {
            await prisma.flowMeterReading.create({
                data: {
                    deviceId: device.id,
                    current_flow: parseFloat(getRandomFloat(5, 15)),
                    cummulative_flow: parseFloat(getRandomFloat(100, 200)),
                    status: Math.random() > 0.5,
                    createdAt: new Date(),
                },
            });
            console.log(`Flow meter reading inserted for device ID: ${device.id}`);
        } catch (error) {
            console.error('Error inserting flow meter reading for device ID:', device.id, error);
        }
    };

    setInterval(async () => {
        for (const device of devices) {
            await createReading(device);
        }
    }, 1000);
};
const createTemperatureReadings = async () => {
    const devices = await prisma.device.findMany({
        where: {
            OR: [{ panelId: 4 }, { panelId: 6 }],
        },
        select: { id: true },
    });

    const createReading = async (device) => {
        try {
            await prisma.temperatureReading.create({
                data: {
                    deviceId: device.id,
                    temperature: parseFloat((Math.random() * 30 + 10).toFixed(2)), // Random temperature between 10 and 40
                    status: Math.random() > 0.5, // Random status
                    createdAt: new Date(),
                },
            });
            console.log(`Temperature reading inserted for device ID: ${device.id}`);
        } catch (error) {
            console.error('Error inserting temperature reading for device ID:', device.id, error);
        }
    };

    setInterval(async () => {
        for (const device of devices) {
            await createReading(device);
        }
    }, 1000);
};
const createHumidityReadings = async () => {
    const devices = await prisma.device.findMany({
        where: { panelId: { in: [5, 7] } },
        select: { id: true },
    });

    const createReading = async (device) => {
        try {
            await prisma.humidityReading.create({
                data: {
                    deviceId: device.id,
                    humidity: parseFloat(getRandomFloat(30, 70)),
                    status: Math.random() > 0.5,
                    createdAt: new Date(),
                },
            });
            console.log(`Humidity reading inserted for device ID: ${device.id}`);
        } catch (error) {
            console.error('Error inserting humidity reading for device ID:', device.id, error);
        }
    };

    setInterval(async () => {
        for (const device of devices) {
            await createReading(device);
        }
    }, 1000);
};
const createWaterLevelReadings = async () => {
    const devices = await prisma.device.findMany({
        where: { panelId: 2 },
        select: { id: true },
    });

    const createReading = async (device) => {
        try {
            await prisma.waterLevelReading.create({
                data: {
                    deviceId: device.id,
                    status: Math.floor(Math.random() * 100), // Random status between 0 and 99
                    createdAt: new Date(),
                },
            });
            console.log(`Water level reading inserted for device ID: ${device.id}`);
        } catch (error) {
            console.error('Error inserting water level reading for device ID:', device.id, error);
        }
    };

    setInterval(async () => {
        for (const device of devices) {
            await createReading(device);
        }
    }, 1000); // Adjust the interval as needed
};
const createCompressorReadings = async () => {
    const devices = await prisma.device.findMany({
        where: { panelId: 8 },
        select: { id: true },
    });

    const createReading = async (device) => {
        try {
            await prisma.compressorReading.create({
                data: {
                    deviceId: device.id,
                    dischargePressure: parseFloat(getRandomFloat(10, 50)),
                    oilPressure: parseFloat(getRandomFloat(1, 10)),
                    dischargeTemperature: parseFloat(getRandomFloat(20, 80)),
                    oilTemp: parseFloat(getRandomFloat(10, 40)),
                    current: parseFloat(getRandomFloat(5, 15)),
                    totalRunningHours: parseFloat(getRandomFloat(100, 500)),
                    machineStatus: Math.floor(Math.random() * 4), // Example status
                    caution: Math.floor(Math.random() * 2), // Example caution
                    load: parseFloat(getRandomFloat(0, 100)),
                    createdAt: new Date(),
                },
            });
            console.log(`Compressor reading inserted for device ID: ${device.id}`);
        } catch (error) {
            console.error('Error inserting compressor reading for device ID:', device.id, error);
        }
    };

    setInterval(async () => {
        for (const device of devices) {
            await createReading(device);
        }
    }, 1000); // Adjust interval as needed
};



const main = async () => {
    //   await clearAllTables();
    await dumpAreas();
    await dumpRooms();
    await dumpPanels();
    await dumpDeviceTypes();
    await dumpDevices();

    // await createEnergyMeterReadings();
    // await createPumpStatusReadings();
    // await createFlowMeterReadings();
    // await createTemperatureReadings(); 
    // await createHumidityReadings(); 
    // await createWaterLevelReadings(); 
    // await createCompressorReadings(); 
    // await incrementCounter();
    //   await clearEnergyMeterReadings();
};

main();