import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  urls: Array<string> = [];
  permalinks: Array<string> = [];
  photoUrls: Array<string> = [];
  topic: string;
  count: string;

  selectedTopic: string;
  selectedCount: number;
  selectedPic: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getConfig()
    .then((res) => {
      res.data.children.map(topic => this.urls.push(topic.data.url)); // got all the topic urls here
    });
  }

  getConfig(): Promise<any> {
    const url = 'https://www.reddit.com/reddits.json';
    return this.http.get(url).toPromise();
  }

  getReditConfig(): Promise<any> {
    const url = 'https://www.reddit.com/' + this.selectedTopic + '.json?&show=all&limit=' + this.selectedCount;
    return this.http.get(url).toPromise();
  }

  getPhotoConfig(): Promise<any> {
    const url = 'https://www.reddit.com/' + this.selectedTopic + '.json?&show=all&limit=' + this.selectedCount;
    return this.http.get(url).toPromise();
  }

  setTopic(data) {
    this.selectedTopic = data;
  }

  setCount(data) {
    this.selectedCount = data;
  }

  navigateToRedit(url) {
    this.getReditConfig()
      .then((res) => {
        res.data.children.map(
          content => {
            if (content.data.url === url) {
              window.open('https://www.reddit.com' + content.data.permalink);
            }
          });
      });
  }

  showContent() {
    this.photoUrls.fill('');
    this.getPhotoConfig()
      .then((res) => {
        res.data.children.map(content => {
          if (content.data.url.charAt(content.data.url.length - 3) === 'j' || content.data.url.charAt(content.data.url.length - 3) === 'p') {
            this.photoUrls.push(content.data.url);
          }
        });
    });
  }
}
