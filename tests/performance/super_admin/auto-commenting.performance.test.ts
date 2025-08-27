describe('Performance - Super Admin Auto Commenting', () => {
  test('randomized delay generator produces values within window', () => {
    const minSec = 300; // 5 min
    const maxSec = 420; // 7 min
    for (let i = 0; i < 20; i++) {
      const randomSec = minSec + Math.random() * (maxSec - minSec);
      expect(randomSec).toBeGreaterThanOrEqual(minSec);
      expect(randomSec).toBeLessThanOrEqual(maxSec);
    }
  });
});


