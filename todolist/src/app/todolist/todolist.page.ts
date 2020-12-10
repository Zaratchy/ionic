import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api/api.service';
import { People } from '../models/people';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})


export class TodolistPage implements OnInit {

  peopleList: Array<People> = [];



  currentDate: string;
  
  

  taskList = [];
  taskName = '';

  constructor(public alertCtrl: AlertController, private api: ApiService) { }

  




  ngOnInit() {

  this.api.getAllPeople().subscribe(response => {
    this.peopleList = response.json().results
  })

  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  this.currentDate = date.toLocaleDateString('fr-FR', options);



  }

  async showPrompt() {
    const prompt = await this.alertCtrl.create({
      inputs: [
        {
          name: 'taskName',
          type: 'text',
          placeholder: 'Indiquez votre tâche',
        },
      ],
      buttons: [
        {
          text: 'Enregistrer',
          handler: data => {
          this.taskName = data.taskName;
          this.taskList.push(this.taskName);
          console.log(this.taskList);
          }
        },
        {
          text: 'Annuler',
        }
      ]
    });
    await prompt.present();
  }

  addTask() {
    if (this.taskName.length > 0) {
      let task = this.taskName;
      this.taskList.push(task);
      this.taskName = '';
    }
  }
  deleteTask(index) {
    this.taskList.splice(index, 1);
  }
}


