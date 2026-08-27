import { Component, Signal, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar';
import { FooterComponent } from '../../components/footer/footer';
import { HON_SON_TRAVEL_DATA } from '../../data/mock-trip.data';
import { PackingItem, TripData } from '../../models/travel.model';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-travel-planner',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './travel-planner.html',
  styleUrls: ['./travel-planner.scss'],
})
export class TravelPlannerComponent {
  private storage = inject(StorageService);

  tripData: TripData = HON_SON_TRAVEL_DATA;

  // Signals
  activeDay = signal<number>(1);
  isDarkMode = signal<boolean>(this.storage.getItem('theme_dark', false));
  notes = signal<string>(
    this.storage.getItem(
      'trip_notes',
      'Remember to bring passport and power bank!\nHotel check-in starts at 14:00.',
    ),
  );

  checklist = signal<PackingItem[]>(
    this.storage.getItem('trip_checklist', [
      { id: 'p1', label: 'CCCD', completed: true, category: 'Docs' },
      { id: 'p2', label: 'Vé tàu', completed: true, category: 'Docs' },
      { id: 'p3', label: 'Kính', completed: false, category: 'Personal' },
      { id: 'p4', label: 'Nón', completed: true, category: 'Personal' },
      {
        id: 'p5',
        label: 'Sạc dự phòng & dây sạc',
        completed: true,
        category: 'Electronics',
      },
      { id: 'p6', label: 'Khăn tắm', completed: false, category: 'Clothes' },
      { id: 'p7', label: 'kem chống nắng', completed: false, category: 'Personal' },
      { id: 'p8', label: 'Bàn chải', completed: false, category: 'Personal' },
      { id: 'p9', label: 'Dầu gội, sữa tắm', completed: false, category: 'Personal' },
      { id: 'p10', label: 'Airpods', completed: false, category: 'Electrics' },
      { id: 'p11', label: 'Bịt mắt', completed: false, category: 'Personal' },
    ]),
  );

  // Computeds
  currentDayItinerary = computed(() =>
    this.tripData.itinerary.find((d) => d.day === this.activeDay()),
  );

  completedChecklistCount = computed(() => this.checklist().filter((i) => i.completed).length);

  checklistProgressPercent = computed(() => {
    const total = this.checklist().length;
    return total === 0 ? 0 : Math.round((this.completedChecklistCount() / total) * 100);
  });

  totalBudget = computed(() => this.tripData.budget.reduce((acc, item) => acc + item.amount, 0));

  constructor() {
    // Theme side-effect
    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      this.storage.setItem('theme_dark', dark);
    });

    // Auto save checklist
    effect(() => {
      this.storage.setItem('trip_checklist', this.checklist());
    });

    // Auto save notes
    effect(() => {
      this.storage.setItem('trip_notes', this.notes());
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update((v) => !v);
  }

  selectDay(dayNumber: number) {
    this.activeDay.set(dayNumber);
  }

  toggleChecklistItem(id: string) {
    this.checklist.update((items) =>
      items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  }

  updateNotes(val: string) {
    this.notes.set(val);
  }

  formatCurrency(val: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
