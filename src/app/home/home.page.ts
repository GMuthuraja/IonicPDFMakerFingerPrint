import { Component } from '@angular/core';
import { DocumentScanner, DocumentScannerOptions } from '@ionic-native/document-scanner/ngx';
import { CardIO } from '@ionic-native/card-io/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private documentScanner: DocumentScanner,
    private cardIO: CardIO,
    private cameraPreview: CameraPreview,
    private faio: FingerprintAIO,
    private camera: Camera,
    private file: File,
    private socialSharing: SocialSharing) { }

  // docscan() {
  //   let opts: DocumentScannerOptions = {};
  //   this.documentScanner.scanDoc(opts)
  //     .then((res: string) => console.log(res))
  //     .catch((error: any) => console.error(error));
  // }

  // cardio() {
  //   this.cardIO.canScan()
  //     .then(
  //       (res: boolean) => {
  //         if (res) {
  //           let options = {
  //             requireExpiry: true,
  //             requireCVV: false,
  //             requirePostalCode: false
  //           };
  //           this.cardIO.scan(options)
  //             .then((res: any) => console.log(res))
  //             .catch((error: any) => console.error(error));
  //         }
  //       }
  //     );
  // }

  // camprev() {
  //   const cameraPreviewOpts: CameraPreviewOptions = {
  //     x: 0,
  //     y: 0,
  //     width: window.screen.width,
  //     height: window.screen.height,
  //     camera: 'rear',
  //     tapPhoto: true,
  //     previewDrag: true,
  //     toBack: false,
  //     alpha: 1
  //   }

  //   this.cameraPreview.startCamera(cameraPreviewOpts).then(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     });

  //   const pictureOpts: CameraPreviewPictureOptions = {
  //     width: 280,
  //     height: 280,
  //     quality: 85
  //   }

  //   this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
  //     console.log(imageData);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  // captureImage() {
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     targetHeight: 100,
  //     targetWidth: 100,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }

  //   this.camera.getPicture(options).then((imageData) => {
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     console.log(base64Image);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  fingerprint() {
    let options = {
      clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
      clientSecret: 'o7aoOMYUbyxaD23oFAnJ', //Necessary for Android encrpytion of keys. Use random secret key.
      disableBackup: true,  //Only for Android(optional)
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate' //Only for iOS
    };

    this.faio.isAvailable().then(result => {
      if (result) {
        this.faio.show(options)
          .then((result: any) => console.log(result))
          .catch((error: any) => console.log(error));
      }
    });
  }

  createPDF() {
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var dd = {
      content: [
        {
          stack: [
            { text: 'my App', style: 'stylemainheader' },
            'My App, Chennai',
          ],
          style: 'address_header',
        },
        {
          stack: [
            'Booking ID: ' + 12345,
            { text: 'Customer Name: Muthu', style: 'subheader' },
          ],
          style: 'header'
        },
        { text: 'Guest Details', style: 'table_header' },
        {
          style: 'tableExample',
          table: {
            widths: [80, 80, 80,],
            body: [
              ['Adult', 'Child', 'Infant'],
              [3, 2, 0]
            ]
          },
          layout: {
            fillColor: function (rowIndex) {
              return (rowIndex === 0) ? '#F7A527' : null;
            },
            paddingLeft: function (i, node) { return 40; },
            paddingRight: function (i, node) { return 40; },
            paddingTop: function (i, node) { return 10; },
            paddingBottom: function (i, node) { return 10; }
          }
        },
        { text: 'Flight Details', style: 'table_header' },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Origin', 'Destination', 'Flight Number', 'Flight Date', 'Flight Time', 'Mode'],
              ["Chennai", "Jeddah", "123456", "12-05-2020", "6:30 PM", "Online"]
            ]
          },
          layout: {
            fillColor: function (rowIndex) {
              return (rowIndex === 0) ? '#F7A527' : null;
            },
            paddingLeft: function (i, node) { return 10; },
            paddingRight: function (i, node) { return 10; },
            paddingTop: function (i, node) { return 10; },
            paddingBottom: function (i, node) { return 10; }
          }
        },
        { text: 'Package Details', style: 'table_header' },
        {
          style: 'tableExample',
          table: {
            widths: [80, 80, 80,],
            body: [
              ['Name', 'Amount'],
              ["Package Name", '₹ ' + 1200],
              ['AddOns', '₹ ' + 200],
              ['Total Amount', '₹ ' + 1400],
            ]
          },
          layout: {
            fillColor: function (rowIndex) {
              return (rowIndex === 0) ? '#F7A527' : null;
            },
            paddingLeft: function (i, node) { return 40; },
            paddingRight: function (i, node) { return 40; },
            paddingTop: function (i, node) { return 10; },
            paddingBottom: function (i, node) { return 10; }
          }
        }
      ],
      footer: function (page, pages) {
        return {
          columns: [
            'Reverse change is not applicable | Thank you for shopping with us',
          ],
          alignment: 'center',
          color: '#A83739',
          fontSize: 16,
          bold: true
        };
      },
      styles: {
        address_header: {
          alignment: 'center',
          fontSize: 15,
          bold: true,
          color: '#A83739'
        },
        header: {
          fontSize: 18,
          bold: true,
          color: "#2A2E43",
          alignment: 'right',
          margin: [0, 90, 0, 15]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [50, 5, 0, 15]
        },
        table_header: {
          fontSize: 18,
          bold: true,
          color: "#A83739",
          margin: [50, 0, 0, 15]
        },

        url: {
          fontSize: 16,
          alignment: 'left'
        },
        stylemainheader: {
          alignment: 'center',
          fontSize: 18,
          bold: true,
          color: '#A83739',
          margin: [0, 0, 0, 10]
        }


      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
    };


    pdfmake.createPdf(dd).getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });
      this.file.writeFile(this.file.externalDataDirectory, "123456" + '.pdf', blob, { replace: true }).then(fileEntry => {
        this.socialSharing.share("Dear Customer,", "MyApp", this.file.externalDataDirectory + "/" + "123456" + '.pdf')
          .then((entries) => {
            console.log('success ' + JSON.stringify(entries));
          })
          .catch((error) => {
            alert('error ' + JSON.stringify(error));
          });
      });
    });
  }

}
