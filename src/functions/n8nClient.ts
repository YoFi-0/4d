import axios from "axios";

class N8N_Client {
    private userId: string = "";
    public async SendMsg(msg: string): Promise<string> {
        const url = "http://localhost:5678/webhook/26ef96c3-0e36-47c0-8ebe-76448fbfe3e7"
        var data = await axios({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                userMsg: msg,
                id:this.CreateRandomUserId(),
            })
        });
        try {
            JSON.parse(data.data);
            return "نشكرك على إختيار فوردزاين راح نتواصل معاك في اقرب وقت إن شاء الله"
        } catch (error) {
            return data.data
        }
    }
    private CreateRandomUserId(): string {
        if (this.userId === "") {
            const numbers = "1234567890abcdefghijklmnopqrstuvwxyz";
            for (let i = 0; i < 10; i++) {
                this.userId += numbers[Math.floor(Math.random() * numbers.length)];
            }
            const date = new Date();
            this.userId += "_" + date.getTime().toString();
        }
        return "1"|| this.userId;
    }
}

export const  n8n_client = new N8N_Client();