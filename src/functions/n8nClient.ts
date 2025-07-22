import axios from "axios";

class N8N_Client {
    private userId: string = "";

    public async SendMsg(msg: string): Promise<string> {
        const url = "https://n8n.4d.com.sa/webhook/26ef96c3-0e36-47c0-8ebe-76448fbfe3e7";
        const response = await axios({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                userMsg: msg,
                id: this.CreateRandomUserId(),
            }),
        });

        const rawData = response.data;

        // إذا الرد يحتوي على iframe، استخرج النص من srcdoc
        const matched = rawData.match(/srcdoc="([^"]+)"/);
        if (matched && matched[1]) {
            return matched[1]; // هذا النص اللي بداخل srcdoc
        }

        return rawData; // في حال ما كان فيه iframe، رجّع الرد زي ما هو
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
        return this.userId;
    }
}

export const n8n_client = new N8N_Client();