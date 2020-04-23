module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                appId: 'com.example.app',
                productName: '效率助手', //项目名，也是生成的安装文件名，即aDemo.exe
                copyright: 'Copyright © 2020', //版权信息
                directories: {
                    output: './dist_electron'//输出文件路径
                },
                win: { //win相关配置
                    icon: 'build/appIcon.ico', //图标，当前图标在根目录下，注意这里有两个坑
                    target: [
                        {
                            target: 'nsis', //利用nsis制作安装程序
                            arch: [
                                'x64' //64
                            ]
                        }
                    ]
                },
                mac: {
                    target: 'dmg',
                    icon: 'build/appIcon.png'
                },
                dmg: {
                    title: '效率助手',
                    icon: 'build/appIcon.icns',
                    contents: [
                        {
                            x: 110,
                            y: 150
                        },
                        {
                            x: 240,
                            y: 150,
                            type: 'link',
                            path: '/Applications'
                        }
                    ],
                    window: {
                        x: 400,
                        y: 400
                    }
                },
                nsis: {
                    oneClick: false, // 是否一键安装
                    allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowToChangeInstallationDirectory: true, // 允许修改安装目录
                    installerIcon: 'build/appIcon.ico', // 安装图标
                    uninstallerIcon: 'build/appIcon.ico', //卸载图标
                    installerHeaderIcon: 'build/appIcon.ico', // 安装时头部图标
                    createDesktopShortcut: true, // 创建桌面图标
                    createStartMenuShortcut: true, // 创建开始菜单图标
                    shortcutName: '效率助手' // 图标名称
                }
            }
        }

    }
};
