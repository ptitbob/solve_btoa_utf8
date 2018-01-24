import {Component, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

    base64Value = "";

    base64encoded: string;

    base64decoded: string;

    _useBtoa = true;

    constructor(private httpClient: HttpClient) {

    }

    ngOnInit(): void {
    }

    encodeBase64(decodeToo?: boolean) {
        this.base64encoded = this._useBtoa ? this.encodeBtoa() : this.base64encoded = this.b64EncodeUnicode(this.base64Value);
        if (decodeToo) {
            this.decodeBase64();
        }
    }

    decodeBase64() {
        const httpHeaders = new HttpHeaders()
            .set("Content-Type", "text/plain")
            .set("data", this.base64encoded)
        ;
        this.httpClient.get("http://localhost:8080/ping/decode", {
            headers: httpHeaders,
            responseType: "text"
        })
            .subscribe(value => {
                this.base64decoded = value;
            });
    }

    b64EncodeUnicode(str) {
        const uriEncoding = encodeURIComponent(str)
            .replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16));
            });
        return btoa(uriEncoding);
    }

    private encodeBtoa(): string {
        return btoa(this.base64Value);
    }

    set useBtoa(useBtoaRequest: boolean) {
        this._useBtoa = useBtoaRequest;
        this.encodeBase64();
        this.decodeBase64();
    }

    get useBtoa(): boolean {
        return this._useBtoa;
    }
}
