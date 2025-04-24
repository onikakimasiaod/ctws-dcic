import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, fromEvent, takeUntil } from 'rxjs'
import { Header } from '@mocks/header'

@Component({
  selector: 'section-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnDestroy {
  public readonly HEADER = Header.data?.MenuItems

  public readonly LOGO = '../../../../public/assets/logo.jpg'

  public isOpen: boolean = false

  public isScroll: boolean = false

  public isMobileHeader: boolean = false

  public isGuestInfo: boolean = false

  private readonly unsubscribe$ = new Subject<void>()

  private readonly WINDOW: Window

  private readonly breakpointService = inject(BreakpointObserver)

  private readonly destroyRef = inject(DestroyRef)

  private readonly document = inject(DOCUMENT)

  constructor() {
    this.WINDOW = this.document.defaultView as Window
  }

  ngOnInit(): void {
    this.onScroll()
    this.breakpointService.observe(`(max-width: 820px)`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(state => {
        this.isMobileHeader = state.matches
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  public toggle(): void {
    this.isOpen = !this.isOpen
  }

  private onScroll(): void {
    fromEvent(this.document, 'scroll')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isScroll = (this.WINDOW.scrollY >= 1)
      })
  }

}
