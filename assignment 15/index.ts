export {};
// Q1
class User {
  public id: number;
  public name: string;
  public email: string;
  private password: string;
  protected phone: string;
  private age: number;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    phone: string,
    age: number,
  ) {
    if (age < 18 || age > 60) {
      throw new Error("Age must be between 18 and 60");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.age = age;
  }

  displayInfo(): void {
    console.log(this.id, this.name, this.email, this.phone);
  }
}

// Q2
class Admin extends User {
  manageNotes(): void {
    console.log("Managing notes...");
  }
}

// Q3
class myNote {
  public id: number;
  public title: string;
  public content: string;
  public userId: number;

  constructor(id: number, title: string, content: string, userId: number) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }

  preview(): string {
    return this.content.substring(0, 20) + "...";
  }
}

// Q4
class NoteBook {
  private notes: Note[] = [];

  addNote(note: Note): void {
    this.notes.push(note);
  }

  removeNote(noteId: number): void {
    this.notes = this.notes.filter((n) => n.id !== noteId);
  }

  getNotes(): Note[] {
    return this.notes;
  }
}

// Q5
class UserWithNotebook extends User {
  notebooks: NoteBook[] = [];

  addNotebook(nb: NoteBook): void {
    this.notebooks.push(nb);
  }
}

// Q6
 class Note {
  public id: number;
  public title: string;
  public content: string;

  public userId: number;

  constructor(id: number, title: string, content: string, userId: number) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.userId = userId;
  }
}

// Q7
class Storage<T> {
  private items: T[] = [];

  addItem(item: T): void {
    this.items.push(item);
  }

  removeItem(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  getAllItems(): T[] {
    return this.items;
  }
}
