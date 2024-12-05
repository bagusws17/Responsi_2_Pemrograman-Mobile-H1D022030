import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mainan',
  templateUrl: './mainan.page.html',
  styleUrls: ['./mainan.page.scss'],
})
export class MainanPage implements OnInit {
  dataMainan: any;
  modalTambah: any;
  modalEdit: any;
  id: any;
  nama: any;
  cerita: any;
  username: string;

  constructor(private api: ApiService, private modal: ModalController, private authService: AuthenticationService, private router: Router, private alertController: AlertController, private toastController: ToastController) { this.username = this.authService.username }

  ngOnInit() {
    this.getMainan();
  }

  getMainan() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMainan = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.cerita = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMainan(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  tambahMainan() {
    if (this.nama != '' && this.cerita != '') {
      let data = {
        nama: this.nama,
        cerita: this.cerita,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: (hasil: any) => {
            this.resetModal();
            console.log('berhasil tambah mainan');
            this.presentToast('Berhasil tambah mainan');
            this.getMainan();
            this.modalTambah = false;
            this.modal.dismiss();
          },
          error: (err: any) => {
            console.log('gagal tambah mainan');
            this.presentToast('Gagal tambah mainan');
          }
        })
    } else {
      console.log('gagal tambah mainan karena masih ada mainan yg kosong');
    }
  }

  hapusMainan(id: any) {
    this.api.hapus(id,
      'hapus.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getMainan();
          console.log('berhasil hapus mainan');
          this.presentToast('Berhasil hapus mainan');
        },
        error: (error: any) => {
          console.log('gagal');
          this.presentToast('Gagal hapus mainan');
        }
      })
  }

  async konfirmasiHapus(id: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: 'Apakah anda yakin ingin menghapus mainan ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          handler: () => {
            console.log('Batal hapus');
          }
        },
        {
          text: 'Hapus',
          role: 'confirm',
          handler: () => {
            this.hapusMainan(id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  ambilMainan(id: any) {
    this.api.lihat(id,
      'lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let mainan = hasil;
          this.id = mainan.id;
          this.nama = mainan.nama;
          this.cerita = mainan.cerita;
        },
        error: (error: any) => {
          console.log('gagal ambil mainan');
        }
      })
  }

  editMainan() {
    let data = {
      id: this.id,
      nama: this.nama,
      cerita: this.cerita
    }
    this.api.edit(data, 'edit.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.resetModal();
          this.getMainan();
          console.log('berhasil edit Mainan');
          this.presentToast('Berhasil edit Mainan');
          this.modalEdit = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal edit Mainan');
          this.presentToast('Gagal edit Mainan');
        }
      })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}