#include <chrono>
#include <ctime>
#include <iostream>

void AfterSomeTime() {
  double d = 0.3;
  for (int i = 0; i < 1e8; ++i) {
    d = 1 / d;
  }
}

int main() {
  // C-style: ctime
  std::cout << "<ctime>\n";

  // CLOCKS_PER_SEC: ticks per sec, normally 1e6
  std::cout << "CLOCKS_PER_SEC: " << CLOCKS_PER_SEC << '\n';

  // clock(): clock time since the start (1/CLOCKS_PER_SEC second)
  std::clock_t c0 = std::clock();
  AfterSomeTime();
  std::clock_t c1 = std::clock();
  std::cout << "CPU time elapsed: " << 1.0 / CLOCKS_PER_SEC * (c1 - c0)
            << " s\n";

  // time(): system time since epoch (second)
  std::time_t t0 = std::time(nullptr);
  std::cout << "Local now: " << std::ctime(&t0);
  std::cout << "UTC now: " << std::asctime(std::gmtime(&t0));

  // Cpp-style: chrono
  std::cout << "\n<chrono>\n";

  // Steady clock: monotonic clock
  auto sc0 = std::chrono::steady_clock::now();
  AfterSomeTime();
  auto sc1 = std::chrono::steady_clock::now();
  std::cout << "Steady clock elapsed: "
            << std::chrono::duration<double>(sc1 - sc0).count() << " s\n";
}
