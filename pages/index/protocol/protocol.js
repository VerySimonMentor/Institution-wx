Page({
    data: {
        protocolText:''
    },

    onLoad: function(options){
        var fileTxt = this;
        const filePath = options.filePath;
        wx.openDocument({
            filePath: filePath,
            success: function(res){
                console.log("successfully open docx!");
                fileTxt.setData({
                    protocolText: res.data
                });
            }
        });
    }
});