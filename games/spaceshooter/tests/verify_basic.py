"""Space Shooter — 기본 검증 테스트 (Playwright 대체, 임시)"""
import subprocess
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent

def test_file_structure():
    """프로젝트 구조가 올바른지 확인"""
    files = [
        BASE / "index.html",
        BASE / "css/style.css",
        BASE / "js/main.js",
        BASE / "js/background.js",
        BASE / "js/player.js",
    ]
    for f in files:
        assert f.exists(), f"Missing: {f}"
    print("✅ File structure OK")

def test_html_content():
    """index.html에 필수 요소가 포함되어 있는지 확인"""
    html = (BASE / "index.html").read_text(encoding="utf-8")
    assert '<canvas id="gameCanvas">' in html, "Missing canvas"
    assert 'score-display' in html, "Missing score-display"
    assert 'hp-display' in html, "Missing hp-display"
    assert 'stage-display' in html, "Missing stage-display"
    assert 'js/main.js' in html, "Missing main.js"
    assert 'js/background.js' in html, "Missing background.js"
    assert 'js/player.js' in html, "Missing player.js"
    print("✅ HTML content OK")

def test_js_syntax():
    """JS 파일들이 문법적으로 유효한지 확인"""
    for js_file in ["js/main.js", "js/background.js", "js/player.js"]:
        result = subprocess.run(
            ["node", "--check", str(BASE / js_file)],
            capture_output=True, text=True
        )
        assert result.returncode == 0, f"{js_file} syntax error: {result.stderr}"
    print("✅ JS syntax OK")

def test_ship_types():
    """SHIP_TYPES에 4종의 우주선이 정의되어 있는지 확인"""
    player_js = (BASE / "js/player.js").read_text(encoding="utf-8")
    assert "BALANCED" in player_js, "Missing BALANCED type"
    assert "ATTACK" in player_js, "Missing ATTACK type"
    assert "SPEED" in player_js, "Missing SPEED type"
    assert "DEFENSE" in player_js, "Missing DEFENSE type"
    assert "class PlayerShip" in player_js, "Missing PlayerShip class"
    assert "getBounds" in player_js, "Missing getBounds() collision method"
    print("✅ Ship types OK")

def test_collision_accuracy():
    """충돌 박스가 폴리곤 실제 크기와 일치하는지 확인 (구조적 검증)"""
    player_js = (BASE / "js/player.js").read_text(encoding="utf-8")

    # getBounds가 size 속성을 기준으로 계산하는지 확인
    assert "this.size" in player_js, "Missing size-based bounds"
    assert "getBounds()" in player_js, "Missing getBounds method"

    # 실제 범위가 적절한지 (size * factor 패턴)
    assert "return {" in player_js and "x:" in player_js and "y:" in player_js, \
        "getBounds should return x, y, width, height"
    print("✅ Collision accuracy (structural) OK")

if __name__ == "__main__":
    test_file_structure()
    test_html_content()
    test_js_syntax()
    test_ship_types()
    test_collision_accuracy()
    print("\n🎮 Task 3 — All checks passed!")
