/* eslint-enable */
'use strict';
import {
    app,
    protocol,
    BrowserWindow,
    remote,
    Menu, MenuItem
} from 'electron';

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

// import { autoUpdater } from 'electron-updater'

// autoUpdater.on('update-downloaded', () => {
//   autoUpdater.quitAndInstall()
// })
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// const tray = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        height: 650,
        useContentSize: true,
        width: 870,
        minHeight: 650, // 窗体最小高度
        minWidth: 870, // 窗体最小高度
        frame: true,
        transparent: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
        initMenu();
    }

    win.on('closed', () => {
        win = null;
    });
}

/**
 * 初始化右键菜单
 */
function initMenu() {
    const menu = new Menu();
    const menu2 = new Menu();

    menu.append(new MenuItem({ label: '撤销', role: 'undo' }));
    menu.append(new MenuItem({ label: '重做', role: 'redo' }));
    // menu.append(new MenuItem({ role: 'separator' }));
    menu.append(new MenuItem({ label: '剪切', role: 'cut' }));
    menu.append(new MenuItem({ label: '复制', role: 'copy' }));
    menu.append(new MenuItem({ label: '粘贴', role: 'paste' }));
    // menu.append(new MenuItem({ role: 'pasteandmatchstyle' }));
    menu.append(new MenuItem({ label: '删除', role: 'delete' }));
    menu.append(new MenuItem({ label: '全选', role: 'selectall' }));

    menu2.append(new MenuItem({ label: '复制', role: 'copy' }));
    //点击dome
    menu2.append(new MenuItem({ label: 'show',
        click() {
        //展示选中文本
            const selectText = window.getSelection().toString();

            alert(selectText);
        } }));
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (isEleEditable(e.target)) {
            menu.popup(remote.getCurrentWindow());
        } else {
            //判断有文本选中
            const selectText = window.getSelection().toString();

            if (selectText) {
                menu2.popup(remote.getCurrentWindow());
            }
        }
    }, false);
}
/**
 * 判断点击区域可编辑
 * @param {*} e
 */
function isEleEditable(e) {
    if (!e) {
        return false;
    }
    //为input标签或者contenteditable属性为true
    if (e.tagName === 'INPUT' || e.contentEditable === 'true') {
        return true;
    }
    //递归查询父节点
    return isEleEditable(e.parentNode);
}

// Quit when all windows are closed.

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }
    }
    if (process.platform === 'darwin') {
        // tray = new Tray('/Users/longyao/development/electron-vue-v6/vue-electron-assistant/src/assets/assistant.png');
        // const contextMenu = Menu.buildFromTemplate([
        //     {
        //         label: '刷新',
        //         role: 'reload'
        //     },
        //     {
        //         label: '强制刷新',
        //         role: 'forcereload'
        //     },
        //     {
        //         label: '隐藏其他',
        //         role: 'hideothers'
        //     },
        //     {
        //         label: '自定义',
        //         role: 'unhide'
        //     },
        //     {
        //         label: '最小化',
        //         accelerator: 'CmdOrCtrl+M',
        //         role: 'minimize'
        //     },
        //     {
        //         role: 'zoomin',
        //         label: '放大'
        //     },
        //     {
        //         role: 'zoomout',
        //         label: '缩小'
        //     },
        //     {
        //         label: '全屏',
        //         role: 'togglefullscreen'
        //     },
        //     {
        //         label: '工具栏',
        //         role: 'toggledevtools'
        //     },
        //     {
        //         label: '关于',
        //         role: 'about'
        //     },
        //     {
        //         role: 'help',
        //         submenu: [
        //             {
        //                 label: 'Electron官网',
        //                 click: async() => {
        //                     const { shell } = require('electron');
        //                     await shell.openExternal('https://electronjs.org');
        //                 }
        //             }
        //         ] }
        // ]);
        // tray.setToolTip('Powerful');
        // tray.setContextMenu(contextMenu);
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
