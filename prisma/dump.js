"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var timers_1 = require("timers");
var prisma = new client_1.PrismaClient();
var areas = ['Substation Area', 'Pump Room Area', 'Production Area', 'Warehouse Area', 'Flow Meter Area'];
var rooms = [
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
var panels = [
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
var devices = [
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
var createUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, _i, users_1, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                users = [
                    { name: 'admin', email: 'admin@example.com', password: 'password123' },
                ];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, 7, 9]);
                _i = 0, users_1 = users;
                _a.label = 2;
            case 2:
                if (!(_i < users_1.length)) return [3 /*break*/, 5];
                user = users_1[_i];
                return [4 /*yield*/, prisma.user.upsert({
                        where: { email: user.email },
                        update: {},
                        create: {
                            name: user.name,
                            email: user.email,
                            password: user.password, // Ensure this matches your UserCreateInput requirements
                        },
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('Users dumped successfully');
                return [3 /*break*/, 9];
            case 6:
                error_1 = _a.sent();
                console.error('Error dumping users:', error_1);
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, prisma.$disconnect()];
            case 8:
                _a.sent();
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}); };
createUsers();
var dumpAreas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, areas_1, name_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, areas_1 = areas;
                _a.label = 1;
            case 1:
                if (!(_i < areas_1.length)) return [3 /*break*/, 4];
                name_1 = areas_1[_i];
                return [4 /*yield*/, prisma.area.upsert({
                        where: { name: name_1 },
                        update: {},
                        create: { name: name_1 },
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log('Areas dumped successfully');
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('Error dumping areas:', error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var dumpRooms = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, rooms_1, room, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, rooms_1 = rooms;
                _a.label = 1;
            case 1:
                if (!(_i < rooms_1.length)) return [3 /*break*/, 4];
                room = rooms_1[_i];
                return [4 /*yield*/, prisma.room.upsert({
                        where: { name: room.name },
                        update: {},
                        create: { name: room.name, areaId: room.areaId },
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log('Rooms dumped successfully');
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.error('Error dumping rooms:', error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var dumpPanels = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, panels_1, panel, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, panels_1 = panels;
                _a.label = 1;
            case 1:
                if (!(_i < panels_1.length)) return [3 /*break*/, 4];
                panel = panels_1[_i];
                return [4 /*yield*/, prisma.panel.upsert({
                        where: { name: panel.name },
                        update: {},
                        create: { name: panel.name, roomId: panel.roomId },
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log('Panels dumped successfully');
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.error('Error dumping panels:', error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var dumpDeviceTypes = function () { return __awaiter(void 0, void 0, void 0, function () {
    var deviceTypes, _i, deviceTypes_1, name_2, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deviceTypes = ['Pump', 'Tank', 'Flow Meter', 'Temperature', 'Humidity', 'Compressor', 'Energy Meter'];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _i = 0, deviceTypes_1 = deviceTypes;
                _a.label = 2;
            case 2:
                if (!(_i < deviceTypes_1.length)) return [3 /*break*/, 5];
                name_2 = deviceTypes_1[_i];
                return [4 /*yield*/, prisma.deviceType.upsert({
                        where: { name: name_2 },
                        update: {},
                        create: { name: name_2 },
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('Device types dumped successfully');
                return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                console.error('Error dumping device types:', error_5);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var dumpDevices = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, devices_1, device, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, 6, 8]);
                _i = 0, devices_1 = devices;
                _a.label = 1;
            case 1:
                if (!(_i < devices_1.length)) return [3 /*break*/, 4];
                device = devices_1[_i];
                return [4 /*yield*/, prisma.device.upsert({
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
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log('Devices dumped successfully');
                return [3 /*break*/, 8];
            case 5:
                error_6 = _a.sent();
                console.error('Error dumping devices:', error_6);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, prisma.$disconnect()];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
var clearAllTables = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 17, 18, 20]);
                return [4 /*yield*/, prisma.energyMeterReading.deleteMany({})];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.flowMeterReading.deleteMany({})];
            case 2:
                _a.sent();
                return [4 /*yield*/, prisma.temperatureReading.deleteMany({})];
            case 3:
                _a.sent();
                return [4 /*yield*/, prisma.humidityReading.deleteMany({})];
            case 4:
                _a.sent();
                return [4 /*yield*/, prisma.compressorReading.deleteMany({})];
            case 5:
                _a.sent();
                return [4 /*yield*/, prisma.pumpStatusReading.deleteMany({})];
            case 6:
                _a.sent();
                return [4 /*yield*/, prisma.waterLevelReading.deleteMany({})];
            case 7:
                _a.sent();
                return [4 /*yield*/, prisma.rule.deleteMany({})];
            case 8:
                _a.sent();
                return [4 /*yield*/, prisma.device.deleteMany({})];
            case 9:
                _a.sent();
                return [4 /*yield*/, prisma.screen.deleteMany({})];
            case 10:
                _a.sent();
                return [4 /*yield*/, prisma.panel.deleteMany({})];
            case 11:
                _a.sent();
                return [4 /*yield*/, prisma.room.deleteMany({})];
            case 12:
                _a.sent();
                return [4 /*yield*/, prisma.user.deleteMany({})];
            case 13:
                _a.sent();
                return [4 /*yield*/, prisma.shift.deleteMany({})];
            case 14:
                _a.sent();
                return [4 /*yield*/, prisma.area.deleteMany({})];
            case 15:
                _a.sent();
                return [4 /*yield*/, prisma.deviceType.deleteMany({})];
            case 16:
                _a.sent();
                console.log('All tables cleared successfully');
                return [3 /*break*/, 20];
            case 17:
                error_7 = _a.sent();
                console.error('Error clearing tables:', error_7);
                return [3 /*break*/, 20];
            case 18: return [4 /*yield*/, prisma.$disconnect()];
            case 19:
                _a.sent();
                return [7 /*endfinally*/];
            case 20: return [2 /*return*/];
        }
    });
}); };
var getRandomFloat = function (min, max) { return (Math.random() * (max - min) + min).toFixed(2); };
var createEnergyMeterReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var devices, createReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.device.findMany({
                    where: {
                        panelId: {
                            gte: 9,
                            lte: 17,
                        },
                    },
                })];
            case 1:
                devices = _a.sent();
                createReading = function (device) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_8;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, prisma.energyMeterReading.create({
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
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Reading inserted for device ID: ".concat(device.id));
                                return [3 /*break*/, 3];
                            case 2:
                                error_8 = _a.sent();
                                console.error('Error inserting reading for device ID:', device.id, error_8);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                (0, timers_1.setInterval)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _i, devices_2, device;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, devices_2 = devices;
                                _a.label = 1;
                            case 1:
                                if (!(_i < devices_2.length)) return [3 /*break*/, 4];
                                device = devices_2[_i];
                                return [4 /*yield*/, createReading(device)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
        }
    });
}); };
function createPumpStatusReadings() {
    return __awaiter(this, void 0, void 0, function () {
        var devices;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.device.findMany({
                        where: { panelId: 1 },
                        select: { id: true },
                    })];
                case 1:
                    devices = _a.sent();
                    (0, timers_1.setInterval)(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _i, devices_3, device;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _i = 0, devices_3 = devices;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < devices_3.length)) return [3 /*break*/, 4];
                                    device = devices_3[_i];
                                    return [4 /*yield*/, prisma.pumpStatusReading.create({
                                            data: {
                                                deviceId: device.id,
                                                status: Math.round(Math.random()),
                                                createdAt: new Date(),
                                            },
                                        })];
                                case 2:
                                    _a.sent();
                                    console.log("Reading inserted for device ID: ".concat(device.id));
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); }, 1000);
                    return [2 /*return*/];
            }
        });
    });
}
var clearEnergyMeterReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.energyMeterReading.deleteMany({})];
            case 1:
                _a.sent();
                console.log('All energy meter readings have been cleared');
                return [3 /*break*/, 5];
            case 2:
                error_9 = _a.sent();
                console.error('Error clearing energy meter readings:', error_9);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var clearPumpStatusReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.pumpStatusReading.deleteMany({})];
            case 1:
                _a.sent();
                console.log('All pump status readings have been cleared');
                return [3 /*break*/, 5];
            case 2:
                error_10 = _a.sent();
                console.error('Error clearing pump status readings:', error_10);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var createFlowMeterReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var devices, createReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.device.findMany({
                    where: { panelId: 3 },
                    select: { id: true },
                })];
            case 1:
                devices = _a.sent();
                createReading = function (device) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_11;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, prisma.flowMeterReading.create({
                                        data: {
                                            deviceId: device.id,
                                            current_flow: parseFloat(getRandomFloat(5, 15)),
                                            cummulative_flow: parseFloat(getRandomFloat(100, 200)),
                                            status: Math.random() > 0.5,
                                            createdAt: new Date(),
                                        },
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Flow meter reading inserted for device ID: ".concat(device.id));
                                return [3 /*break*/, 3];
                            case 2:
                                error_11 = _a.sent();
                                console.error('Error inserting flow meter reading for device ID:', device.id, error_11);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                (0, timers_1.setInterval)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _i, devices_4, device;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, devices_4 = devices;
                                _a.label = 1;
                            case 1:
                                if (!(_i < devices_4.length)) return [3 /*break*/, 4];
                                device = devices_4[_i];
                                return [4 /*yield*/, createReading(device)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
        }
    });
}); };
var createTemperatureReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var devices, createReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.device.findMany({
                    where: {
                        OR: [{ panelId: 4 }, { panelId: 6 }],
                    },
                    select: { id: true },
                })];
            case 1:
                devices = _a.sent();
                createReading = function (device) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_12;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, prisma.temperatureReading.create({
                                        data: {
                                            deviceId: device.id,
                                            temperature: parseFloat((Math.random() * 30 + 10).toFixed(2)), // Random temperature between 10 and 40
                                            status: Math.random() > 0.5, // Random status
                                            createdAt: new Date(),
                                        },
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Temperature reading inserted for device ID: ".concat(device.id));
                                return [3 /*break*/, 3];
                            case 2:
                                error_12 = _a.sent();
                                console.error('Error inserting temperature reading for device ID:', device.id, error_12);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                (0, timers_1.setInterval)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _i, devices_5, device;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, devices_5 = devices;
                                _a.label = 1;
                            case 1:
                                if (!(_i < devices_5.length)) return [3 /*break*/, 4];
                                device = devices_5[_i];
                                return [4 /*yield*/, createReading(device)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
        }
    });
}); };
var createHumidityReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var devices, createReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.device.findMany({
                    where: { panelId: { in: [5, 7] } },
                    select: { id: true },
                })];
            case 1:
                devices = _a.sent();
                createReading = function (device) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_13;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, prisma.humidityReading.create({
                                        data: {
                                            deviceId: device.id,
                                            humidity: parseFloat(getRandomFloat(30, 70)),
                                            status: Math.random() > 0.5,
                                            createdAt: new Date(),
                                        },
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Humidity reading inserted for device ID: ".concat(device.id));
                                return [3 /*break*/, 3];
                            case 2:
                                error_13 = _a.sent();
                                console.error('Error inserting humidity reading for device ID:', device.id, error_13);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                (0, timers_1.setInterval)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _i, devices_6, device;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, devices_6 = devices;
                                _a.label = 1;
                            case 1:
                                if (!(_i < devices_6.length)) return [3 /*break*/, 4];
                                device = devices_6[_i];
                                return [4 /*yield*/, createReading(device)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
        }
    });
}); };
var createWaterLevelReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var devices, createReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.device.findMany({
                    where: { panelId: 2 },
                    select: { id: true },
                })];
            case 1:
                devices = _a.sent();
                createReading = function (device) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_14;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, prisma.waterLevelReading.create({
                                        data: {
                                            deviceId: device.id,
                                            status: Math.floor(Math.random() * 100), // Random status between 0 and 99
                                            createdAt: new Date(),
                                        },
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Water level reading inserted for device ID: ".concat(device.id));
                                return [3 /*break*/, 3];
                            case 2:
                                error_14 = _a.sent();
                                console.error('Error inserting water level reading for device ID:', device.id, error_14);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                (0, timers_1.setInterval)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _i, devices_7, device;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, devices_7 = devices;
                                _a.label = 1;
                            case 1:
                                if (!(_i < devices_7.length)) return [3 /*break*/, 4];
                                device = devices_7[_i];
                                return [4 /*yield*/, createReading(device)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 1000); // Adjust the interval as needed
                return [2 /*return*/];
        }
    });
}); };
var createCompressorReadings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var devices, createReading;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.device.findMany({
                    where: { panelId: 8 },
                    select: { id: true },
                })];
            case 1:
                devices = _a.sent();
                createReading = function (device) { return __awaiter(void 0, void 0, void 0, function () {
                    var error_15;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, prisma.compressorReading.create({
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
                                    })];
                            case 1:
                                _a.sent();
                                console.log("Compressor reading inserted for device ID: ".concat(device.id));
                                return [3 /*break*/, 3];
                            case 2:
                                error_15 = _a.sent();
                                console.error('Error inserting compressor reading for device ID:', device.id, error_15);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                (0, timers_1.setInterval)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _i, devices_8, device;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _i = 0, devices_8 = devices;
                                _a.label = 1;
                            case 1:
                                if (!(_i < devices_8.length)) return [3 /*break*/, 4];
                                device = devices_8[_i];
                                return [4 /*yield*/, createReading(device)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }, 1000); // Adjust interval as needed
                return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //   await clearAllTables();
            return [4 /*yield*/, dumpAreas()];
            case 1:
                //   await clearAllTables();
                _a.sent();
                return [4 /*yield*/, dumpRooms()];
            case 2:
                _a.sent();
                return [4 /*yield*/, dumpPanels()];
            case 3:
                _a.sent();
                return [4 /*yield*/, dumpDeviceTypes()];
            case 4:
                _a.sent();
                return [4 /*yield*/, dumpDevices()];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
