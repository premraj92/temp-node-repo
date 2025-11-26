// Built in MOdules - of NODE
// Node has a LOT OF Built in MODULES with each module in turn Having LOT of PROPERTIES & METHODS
// So checking out most/all of them at a time - will be exhausting & difficult, time consuming


// So we will look at some of the WIDELy Used & Popular modules & the most common PROPERTIES & METHODS of these modules
// List of Modules to look At
  // 1. OS (operating system)
  // 2. PATH
  // 3. FS (file system)
  // 4. HTTP


  // OS MOdule
  // Its a built in module that provides may useful props/methods to interact with OS & Server
  const os = require('os')

  // console.log(`OS `, os)

  // GET Info about the current USER
  console.log(`User Info `,os.userInfo())

  // GET the system UPTIME(since last bootup) in seconds
  console.log(`System Uptime is `, os.uptime())


  const currentOSInfo = {
    osVersion: os.version(),
    osType: os.type(),
    osRelease: os.release(),
    osTotalMemory: os.totalmem(),
    osFreeMemory: os.freemem(),
    osMachineType: os.machine(),
    osCPUs: os.cpus()
  }

  console.log(`OS Info : `, currentOSInfo)