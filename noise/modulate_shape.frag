#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st){
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    float a=dot(random2(ipos),fpos);
    float b=dot(random2(ipos+vec2(1.,0.)),fpos-vec2(1.,0.));
    float c=dot(random2(ipos+vec2(0.,1.)),fpos-vec2(0.,1.));
    float d=dot(random2(ipos+vec2(1.,1.)),fpos-vec2(1.,1.));

    vec2 u=smoothstep(0.,1.,fpos);

    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

float modulate_circle(vec2 st,vec2 pos,float diameter){
    diameter/=2.;
    st-=pos;
    float r=length(st);
    float a=atan(st.y,st.x);
    float m=abs(mod(a+u_time*2.,3.14*2.)-3.14)/3.6;

    diameter+=sin(a*50.)*noise(st+u_time*0.2)*0.1;
    diameter+=(sin(a*20.)*.1*pow(m,2.));
    float pct=1.-smoothstep(diameter,diameter+0.001,r);
    return pct;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.);

    float diameter=0.8;
    float width=0.05;

    color=vec3(
        modulate_circle(st,vec2(0.5,0.5),diameter)
        -modulate_circle(st,vec2(0.5,0.5),diameter-width)
    );

    gl_FragColor=vec4(1.-color,1.);
}